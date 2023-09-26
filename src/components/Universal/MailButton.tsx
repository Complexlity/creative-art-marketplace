import { FC } from 'react'
import { Mail, Check, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useQuery } from '@tanstack/react-query';
import { getPendingBids } from '~/utils/queries';

import { useAuth, useUser } from '@clerk/nextjs';
import useCurrentUser from '~/hooks/useCurrentUser';
import { Nft, NftBid, Prettify, WithUser } from '~/utils/types';
import useNftBids from '~/hooks/useNftBids';


interface MailButtonProps {
}



const MailButton: FC<MailButtonProps> = () => {
  const { userId } = useAuth()
  const { data: pendingBids } = useQuery({
    queryKey: ['pending-bids'],
    queryFn: async () => {
      const data = await getPendingBids(userId!)
      return data
    }
  })
console.log(pendingBids)
  return (
    <Dialog>
      <DialogTrigger>
        <div className="mx-auto relative w-fit hover:bg-gray-700 rounded-full p-1">
          <Mail />
          {
            pendingBids && pendingBids.length > 0
           ? <div className="min-h-4 min-w-4 absolute -top-[0px] left-[calc(100%-10px)] flex items-center  justify-center rounded-full bg-blue-400 px-1 text-xs">
            {pendingBids!.length}
              </div>
              : null
          }
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center mb-4'>Pending Bids</DialogTitle>
          <DialogDescription>
            <div className=" rounded-xl grid gap-4">
              {
                pendingBids?.map(bid => (
                  <BidMail bid={bid} />
                ))
              }
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

type BidMailProps = {
  bid: (WithUser<NftBid> & { nfts: Nft })
}

function BidMail({bid}: BidMailProps) {
  return (
    <div className="flex text-black gap-4 items-center border-b-2 border-amber-100">
      <span>{bid.users.username}</span>
      <span>{bid.nfts.name}</span>
      <span>{bid.amount}ETH</span>
      <span>{bid.nfts.price}ETH</span>
      <div className="flex justify-self-end ml-auto gap-2 items-center">
        <div className="rounded-full p-1 hover:bg-green-200 hover:cursor-pointer">
        <Check className="text-green-500" />
        </div>
        <div className="p-1 rounded-full hover:bg-red-200 hover:cursor-pointer">
        <X className="text-red-500"/>
        </div>
      </div>
    </div>
  )
}


export default MailButton