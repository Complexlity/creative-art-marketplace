import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { getPendingBids } from "~/utils/queries";

import { useAuth } from "@clerk/nextjs";
import BidMessage from "./BidMessage";

interface PendingBidsButtonProps {}

const PendingBidsButton: FC<PendingBidsButtonProps> = () => {
  const { userId } = useAuth();
  const { data: pendingBids } = useQuery({
    queryKey: ["pending-bids"],
    queryFn: async () => {
      const data = await getPendingBids(userId!);
      return data;
    },
  });
  console.log(pendingBids);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative mx-auto w-fit rounded-full p-1 hover:bg-gray-700">
          <Mail />
          {pendingBids && pendingBids.length > 0 ? (
            <div className="min-h-4 min-w-4 absolute -top-[0px] left-[calc(100%-10px)] flex items-center  justify-center rounded-full bg-blue-400 px-1 text-xs">
              {pendingBids!.length}
            </div>
          ) : null}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">Pending Bids</DialogTitle>
          <DialogDescription>
            <div className=" grid gap-4 rounded-xl">
              {pendingBids?.map((bid) => (
                <BidMessage bid={bid} />
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PendingBidsButton;
