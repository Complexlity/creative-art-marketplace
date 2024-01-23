import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import MktIcon from "~/components/Universal/MktIcon";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { Nft, WithUser } from "~/utils/types";

const formSchema = z.object({
  itemPrice: z.number().positive().optional(),
  bid: z.coerce
    .number({
      invalid_type_error: "Enter a price to bid",
      required_error: "Field cannot be left blank",
    })
    .positive("Number must be greater than zero"),
});



export default function BidInputForm({
  setOpen,
  price,
  nftData
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
    price: number;
  nftData: WithUser<Nft>
  }) {
  const queryClient = useQueryClient()
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;



  const { userId } = useAuth();
  const formRef = useRef(null);
  const supabase = useSupabase();
  const [isBidding, setIsBidding] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemPrice: price,
      bid: undefined,
    },
  });
 async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!supabase || !userId) return toast("Not Autheticated");
    if (nftData.user_id === userId)
      return toast("Cannot bid for your own item");
    setIsBidding(true);
    try {
      const { data, error } = await supabase
        .from("bids")
        .insert([{ user_id: userId, slug: currentPathname, amount: values.bid ?? values.itemPrice }])
        .select();

      // Add to bidder's transactions
      const { data: transaction } = await supabase
        .from("transactions")
        .insert([{ user_id: userId, amount: values.bid ?? values.itemPrice, type: "bid", status: "pending" ,  name: nftData.name, balance_change: -values.bid ?? values.itemPrice }])
        .select();

      if (error) throw error;
      toast("Bid submit successful. We will get back to you shortly 🤗");
      queryClient.invalidateQueries({ queryKey: ["bids", currentPathname] })
      form.reset();
      setIsBidding(false);
      setOpen(false);
    } catch (error) {
      toast("Something Went Wrong");
      setIsBidding(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          id="hook-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2"
        >
          <FormField
            control={form.control}
            name="itemPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Price(<MktIcon />)</FormLabel>
                <FormControl>
                  <Input disabled placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  <em>Prices can fluctuate depending on the market</em>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bid Amount(<MktIcon />)</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:italic"
                    step="any"
                    type="number"
                    placeholder="enter a negotiable price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <motion.button
            disabled={isBidding}
            className="mt-4 justify-self-end rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isBidding ? "Bidding..." : "Submit Bid"}
          </motion.button>
        </form>
      </Form>
    </>
  );
}
