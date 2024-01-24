import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { Nft, WithUser } from "~/utils/types";
import { AlertDialogHeader, AlertDialogFooter } from "../../ui/alert-dialog";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";
import MktIcon from "~/components/Universal/MktIcon";
import useCurrentUser from "~/hooks/useCurrentUser";

export default function BuyNowModal({ nftData }: { nftData: WithUser<Nft> }) {
  const [open, setOpen] = useState(false);
  const { data: user } = useCurrentUser({});
  const supabase = useSupabase();
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;

  const [isLoading, setIsLoading] = useState(false);
  async function buyItem() {
    if (!supabase || !userId || !user) return toast("Not Autheticated");
    if (nftData.user_id === userId)
      return toast("Cannot bid for your own item");
    setIsLoading(true);
    try {
      // Change buyer's bid to accepted
      const { data, error } = await supabase
        .from("bids")
        .insert([
          {
            user_id: userId,
            slug: currentPathname,
            amount: nftData.price,
            status: "accepted",
          },
        ])
        .select();

      // Deduct currency from both buyer and add to seller
      const promise1 = supabase
        .from("users")
        .update({ game_currency: user.game_currency! - nftData.price })
        .eq("user_id", userId)
        .select();
      const promise2 = supabase
        .from("users")
        .update({ game_currency: user.game_currency! + nftData.price })
        .eq("user_id", nftData.users.user_id)
        .select();

      //Add information to transactions table for both buyer and seller
      const promise3 = supabase
        .from("transactions")
        .insert([
          {
            amount: nftData.price,
            name: nftData.name,
            balance_change: -nftData.price,
            user_id: userId,
            type: "bid",
            status: "accepted",
          },
          {
            amount: nftData.price,
            name: nftData.name,
            balance_change: nftData.price,
            user_id: nftData.users.user_id,
            type: "bid",
            status: "accepted",
          },
        ])
        .select();
      const [{ data: buyer }, { data: seller }, { data: transactions }] =
        await Promise.all([promise1, promise2, promise3]);

      if (error) throw error;
      toast(`Thank you for buying ${nftData.name} for ${nftData.price}`);
      queryClient.invalidateQueries({ queryKey: ["bids", currentPathname] });
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger onClick={setOpen.bind(null, true)}>
        <motion.button
          className="rounded-full bg-primary px-6 py-2 font-bold text-gray-800 hover:shadow-round hover:shadow-gray-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Buy Now
        </motion.button>
      </AlertDialogTrigger>
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>{nftData.name}</AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            {nftData.description}
            <br />
            <br />
            Are you sure you want to purchase this item for{" "}
            <span className="font-bold">
              {nftData.price}
              <MktIcon />?
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={setOpen.bind(null, false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="focus:outine-none bg-transparent p-0 focus:border-none focus-visible:border-none focus-visible:outline-none"
            onClick={buyItem}
            disabled={isLoading}
          >
            <motion.button
              className="rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              {isLoading ? (
                <Loader2 className="animate-spin duration-1000 ease-in-out" />
              ) : (
                "Buy"
              )}
            </motion.button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
