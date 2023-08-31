// import { Button } from "~/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import BidInputForm from "./BidInputForm";
import type { NFT } from "~/data/nfts";
import { BuyOptions } from "./Modals";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";

export function Modals2() {
  const nftData: any = {}
  const [openModal, setOpenModal] = useState < BuyOptions | undefined>("BUY_NOW")
  return (
    <div className="flex gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <button>Edit Profile</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div>
            <BidInputForm nftData={nftData} setOpenModal={setOpenModal} />
            {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" /> */}
            {/* </div> */}
          </div>
          <DialogFooter>
            <button>My Button</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <button>Remove Profile</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div>
            <BidInputForm nftData={nftData} setOpenModal={setOpenModal} />
            {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" /> */}
            {/* </div> */}
          </div>
          <DialogFooter>
            <button>My Button</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
