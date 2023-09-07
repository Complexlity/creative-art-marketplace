import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
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
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { usePathname } from "next/navigation";
import useCurrentPage from "~/hooks/useCurrentPage";
import { NFT } from "~/data/nfts";

const formSchema = z.object({
  itemPrice: z.number().positive().optional(),
  bid: z.coerce.number({
    invalid_type_error: "Enter a price to bid",
    required_error:"Field cannot be left blank"
  }).positive("Number must be greater than zero")
});



export default function BidInputForm2({ setOpen, price }: { setOpen: Dispatch<SetStateAction<boolean>>, price: number }) {
  const pathname = usePathname()
  const {user
} = useUser()
  const currentPathname = pathname.split('/').pop()!
  const { data } = useCurrentPage({ slug: currentPathname })
  const nftData = data as unknown as NFT

  const { userId } = useAuth()
  const formRef = useRef(null)
  const supabase = useSupabase()
  const [isBidding, setIsBidding] = useState(false)

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
     if (!supabase || !userId) return toast("Not Autheticated")
    if(nftData.creator === userId) return toast ("Cannot bid for your own item")
     setIsBidding(true)
     try {

const { data: inserttedUser, error: userInputError } = await supabase
  .from("users")
  .insert([{ name: user?.username, imageUrl: user?.imageUrl, userId: userId }])
  .select();

const { data, error } = await supabase
  .from("bids")
  .insert([{ placer: userId, nftSlug: currentPathname }])
    .select();

  if (error) throw error
  toast("Bid submit successful. We will get back to you shortly 🤗");
  form.reset()
  setIsBidding(false)
  setOpen(false);
}

catch (error) {
  console.log(error)
  toast("Something Went Wrong")
  setIsBidding(false)
}

    }
  return (
    <>
      <Form {...form}>
        <form

          id="hook-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-2 grid"
        >
          <FormField
            control={form.control}
            name="itemPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Price(ETH)</FormLabel>
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
                <FormLabel>Bid Amount(ETH)</FormLabel>
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
            className="mt-4 rounded-md justify-self-end bg-green-500 px-6 py-2 text-white hover:bg-green-300"
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