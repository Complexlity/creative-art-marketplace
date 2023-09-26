
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseWithClient } from "supabase";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { useState } from "react";


type BidMailProps = {
  bid: WithUser<NftBid> & { nfts: Nft };
};

export default function BidMessage({ bid }: BidMailProps) {
  const supabase = useSupabase()
  const queryClient = useQueryClient();
  const { mutate: bidFeedback, isLoading } = useMutation({

    mutationFn: async (type: "accepted" | 'rejected') => {

      const {data, error} =  await supabase!.from('bids')
        .update({ status: type })
        .eq('id', bid.id)
        .select()
      if(error) throw new Error(error.message)
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pending-bids'] })
      console.log(data)
      setAcceptModal(false)
      setRejectModal(false)
    },
    onError: (error) => {
      //@ts-ignore
      console.log(error?.message)
      setAcceptModal(false)
      setRejectModal(false)
    }
  })
  const [acceptModal , setAcceptModal ] = useState(false)
  const [rejectModal , setRejectModal ] = useState(false)
  return (
    <div className="flex items-center gap-4 border-b-2 border-amber-100 text-black">
      <span>{bid.users.username}</span>
      <span>{bid.nfts.name}</span>
      <span>{bid.amount}ETH</span>
      <span>{bid.nfts.price}ETH</span>
      <div className="ml-auto flex items-center gap-2 justify-self-end">
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
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white text-black">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                // @ts-ignore mutate function in button event
                onClick={bidFeedback.bind(null, "accepted")}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin duration-75 ease-linear" />
                ) : (
                  "Continue"
                )}
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
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                // @ts-ignore mutate function in button event
                onClick={bidFeedback.bind(null, "rejected")}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin duration-75 ease-linear" />
                ) : (
                  "Continue"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
