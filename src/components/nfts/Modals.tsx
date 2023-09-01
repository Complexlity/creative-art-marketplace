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
import BidInputForm2 from "./BidInputForm";
import "react-toastify/dist/ReactToastify.css";

export function Modals({ nftData }: { nftData: NFT }) {
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

function BuyNowModal({ nftData }: { nftData: NFT }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="focus:outine-none bg-transparent p-0 focus:border-none focus-visible:border-none focus-visible:outline-none"
            onClick={() => {
              toast(
                "Bid submit successful. We will get back to you shortly 🤗"
              );
            }}
          >
            <motion.button
              className="rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              Buy
            </motion.button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function PlaceBidModal({ nftData }: { nftData: NFT }) {
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
        <BidInputForm2 setOpen={setOpen} price={nftData.price} />
      </DialogContent>
    </Dialog>
  );
}
