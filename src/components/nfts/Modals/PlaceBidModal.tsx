import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { motion } from "framer-motion";
import { Nft, WithUser } from "~/utils/types";
import BidInputForm from "./BidInputForm";

export default function PlaceBidModal({ nftData }: { nftData: WithUser<Nft> }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          className="rounded-full bg-gray-500 px-6 py-2 hover:shadow-round hover:shadow-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Place a bid
        </motion.button>
      </DialogTrigger>
      <DialogContent className="dark sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{nftData.name}</DialogTitle>
          <DialogDescription>{nftData.description}</DialogDescription>
        </DialogHeader>
        <BidInputForm
          setOpen={setOpen}
          price={nftData.price}
          nftData={nftData}
        />
      </DialogContent>
    </Dialog>
  );
}
