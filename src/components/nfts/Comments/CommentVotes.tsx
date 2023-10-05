
import { useAuth, useUser } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { supabaseWithoutClient as supabase, supabaseWithClient as supabaseClient } from 'supabase';
import { cn } from '~/utils/libs';

interface CommentVotesProps {
  commentId: number
}




const CommentVotes: FC<CommentVotesProps> = ({
  commentId }) => {
  const queryClient = useQueryClient()
  const { userId, getToken } = useAuth()


  const { data: votes, error } = useQuery({
    queryKey: [`comment_votes`, commentId],
    queryFn: async () => {
      const { data: votes, error } = await supabase.from('comment_votes').select("*").eq('comment', commentId)
      return votes
    }
  })



  const { mutate: vote } = useMutation({
    mutationFn: async (data) => {
      console.log(data)
      const {newVoteType, previousVoteType} = data
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      if (!userId || !supabase) {
        return votes
      }

      if (previousVoteType) {
        console.log(supabase)
        console.log(userId)
        console.log(commentId)
        console.log({newVoteType, previousVoteType})

const { data: newVotes, error } = await supabase
  .from("comment_votes")
  .update({type: newVoteType})
          .eq("voter", userId)
          .eq('comment', commentId)
        .select()
console.log({newVotes, error})
      }
      else {
        console.log({newVoteType, previousVoteType})
        const { data: newVotes, error } = await supabase
          .from("comment_votes")
          .insert({
            type: newVoteType,
            voter: userId,
            comment: commentId
          })
          console.log('I inserted the votes successfully')

      }
      if(error) throw new Error("Something went wrong")
      console.log("done")
    },
    onMutate: ({ newVoteType, previousVoteType }) => {

    },
    onError: (err, { newVoteType, previousVoteType }) => {

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`comment_votes`, commentId] });
    }
  })


if(!votes) return null


  if (votes.length > 0) {
    console.log('There are some votes')
    console.log(votes)

  }
  else {
    console.log(votes)
    console.log('Lolz. You think there will be votes?')
  }


  return (
    <div className="flex items-center gap-2">
      {/* Upvote button + count */}
      <ArrowBigUp
        className={cn({
          "cursor-pointer transition-all duration-75 hover:scale-[115%] hover:text-green-400":
            userId,
          "fill-green-400 text-green-400 hover:!scale-[100%]":
            votes.find(
              (obj) => (obj.voter = userId && obj.comment == commentId)
            )?.type == "up",
        })}
        onClick={() => {
          if (userId) {
            // @ts-ignore will fix later
            vote({
              newVoteType: "up",
              previousVoteType: votes.find(
                (obj) => (obj.voter = userId && obj.comment == commentId)
              )?.type,
            });
          }
        }}
      />
      {votes.reduce((acc, vote) => {
        if (vote.type === "up") return acc + 1;
        if (vote.type === "down") return acc - 1;
        return acc;
      }, 0)}
      {/* Downvote button */}
      <ArrowBigDown
        className={cn({
          "cursor-pointer transition-all duration-75 hover:scale-[110%] hover:text-red-400":
            userId,
          "fill-red-400 text-red-400 hover:!scale-[100%]":
            votes.find(
              (obj) => (obj.voter = userId && obj.comment == commentId)
            )?.type == "down",
        })}
        onClick={() => {
          if (userId) {
            // @ts-ignore will fix later
            vote({
              newVoteType: "down",
              previousVoteType: votes.find(
                (obj) => (obj.voter = userId && obj.comment == commentId)
              )?.type,
            });
          }
        }}
      />
    </div>
  );
}

export default CommentVotes