// import { Button } from "~/components/ui/button";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import type { NFT } from "~/data/nfts";
import BidInputForm from "./BidInputForm";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { useAuth } from "@clerk/nextjs";
import { Nft } from "~/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function Modals({ nftData }: { nftData: Nft }) {
  return (
    <div className="flex gap-4">
      <BuyNowModal nftData={nftData} />
      <PlaceBidModal nftData={nftData} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        theme="dark"
        pauseOnHover={false}
      />
    </div>
  );
}

function BuyNowModal({ nftData }: { nftData: Nft }) {
  const [open, setOpen] = useState(false)
  const supabase = useSupabase()
  const { userId } = useAuth()
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;


  const [isLoading, setIsLoading] = useState(false)
  async function buyItem () {
    if (!supabase || !userId) return toast("Not Autheticated");
    if (nftData.user_id === userId)
    return toast("Cannot bid for your own item");
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("bids")
        .insert([{ user_id: userId, slug: currentPathname, amount: nftData.price, status: "accepted" }])
        .select();

      if (error) throw error;
      toast("Bid submit successful. We will get back to you shortly 🤗");
      queryClient.invalidateQueries({ queryKey: ["bids", currentPathname] })
      setOpen(false);
    } catch (error) {
      toast("Something Went Wrong");
    }
    finally {
      setIsLoading(false)
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{nftData.name}</AlertDialogTitle>
          <AlertDialogDescription>
            {nftData.description}
            <br />
            <br />
            Are you sure you want to purchase this item for{" "}
            <span className="font-bold text-black">{nftData.price}ETH?</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={setOpen.bind(null, false)}>Cancel</AlertDialogCancel>
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
              {isLoading ? <Loader2 className="animate-spin duration-1000 ease-in-out" /> : "Buy"}
            </motion.button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function PlaceBidModal({ nftData }: { nftData: Nft }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          className="rounded-full bg-gray-500 px-6 py-2 hover:shadow-round hover:shadow-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Place a bid
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{nftData.name}</DialogTitle>
          <DialogDescription>{nftData.description}</DialogDescription>
        </DialogHeader>
        <BidInputForm setOpen={setOpen} price={nftData.price} nftData={nftData} />
      </DialogContent>
    </Dialog>
  );
}
