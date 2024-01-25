
import { Check, Loader2, X } from "lucide-react";
import { NftBid, Nft, WithUser } from "~/utils/types";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import MktIcon from "~/components/Universal/MktIcon";
import { toast } from "react-toastify";


type BidMailProps = {
  bid: WithUser<NftBid> & { nfts: WithUser<Nft> };
};



export default function BidMessage({ bid }: BidMailProps) {
  const supabase = useSupabase()
  const queryClient = useQueryClient();
  const { userId } = useAuth()
  const [rejectModal , setRejectModal ] = useState(false)
const [acceptModal, setAcceptModal] = useState(false)
  const { mutate: bidFeedback, isLoading: isReactingBid } = useMutation({

    mutationFn: async (type: "accepted" | 'rejected') => {
      let bidMessage: string;
      if (type == 'accepted') {
        setAcceptModal(false)
        bidMessage = `Your bid of ${bid.amount}MKT for ${bid.nfts.name} was ACCEPTED!!`
      }
      else{
        setRejectModal(false)
        bidMessage = `Your bid of ${bid.amount}MKT for ${bid.nfts.name} was REJECTED!!`
    }
      if (userId !== bid.nfts.user_id) {
        alert('Cannot accept or reject bid. This is not your item')
        throw new Error("unautorized")
      }
      const {data, error} =  await supabase!.from('bids')
        .update({ status: type })
        .eq('id', bid.id)
      if (error) throw new Error(error.message)


      const { data: messages, error: messageError } = await supabase!
        .from("messages")
        .insert([{ user_id: bid.users.user_id, content: bidMessage }])

      if (messageError) throw new Error(messageError.message)
        return
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['pending-bids'] })
      queryClient.invalidateQueries({queryKey: ['messages']})
    },
    onError: (error) => {
      //@ts-ignore
      console.log(error?.message)
      toast.error("Something Went Wrong")
    }
  })

  return (
    <div className="flex items-center gap-4 border-b-2 border-amber-100 text-white">
      <span>{bid.users.username}</span>
      <span>{bid.nfts.name}</span>
      <span>{bid.amount}<MktIcon /></span>
      <span>{bid.nfts.price}<MktIcon /></span>
      <div className="ml-auto flex items-center gap-2 justify-self-end">
        {isReactingBid ? (
          <Loader2 className="animate-spin duration-1000 ease-in-out" />
        ) : (
          <>
            <AlertDialog open={acceptModal}>
              <AlertDialogTrigger onClick={setAcceptModal.bind(null, true)}>
                <div className="rounded-full p-1 hover:cursor-pointer hover:bg-green-200">
                  <Check className="text-green-500" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-green-100">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-black">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={setAcceptModal.bind(null, false)}
                    className="bg-white text-black"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    // @ts-ignore mutate function in button event
                    onClick={bidFeedback.bind(null, "accepted")}
                  >
                      Continue

                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={rejectModal}>
              <AlertDialogTrigger onClick={setRejectModal.bind(null, true)}>
                <div className="rounded-full p-1 hover:cursor-pointer hover:bg-red-200">
                  <X className="text-red-500" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-red-100">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-black">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={setRejectModal.bind(null, false)}
                    className="bg-white"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction

                    // @ts-ignore mutate function in button event
                    onClick={bidFeedback.bind(null, "rejected")}
                  >
                      Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </div>
  );
}
