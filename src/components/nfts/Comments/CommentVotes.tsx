
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
  console.log(commentId)
  const [myVote, setMyVote] = useState(null)
  const [voteCount, setVoteCount] = useState(0)
  const { status, data: comment_votes, error } = useQuery({
    queryKey: [`comment_votes`, commentId],
    queryFn: async () => {
let { data: votes, error } = await supabase.from('comment_votes')
        .select('*').eq('comment', commentId)

return votes
    }
  })

  console.log(comment_votes)

  useEffect(() => {
    if (status === 'success' && comment_votes && userId && comment_votes.length > 0) {

      let vote = null;
      let count = 0;

      for (let i = 0; i < comment_votes.length; i++) {
        const curr = comment_votes[i];
        if (curr.user === userId) {
          vote = curr.type;
        }
        if (curr.type === "up") {
          count += 1
          console.log(count)
        } else if (curr.type === "down") {
          count -= 1;
          console.log(count)
        }
      }
      console.log(vote, count)
      setMyVote(vote);
      setVoteCount(count);
    }

}, [status, comment_votes])

  console.log(myVote)
if(commentId === 18) console.log(comment_votes)

  const { mutate: vote } = useMutation({
    mutationFn: async (data) => {
      console.log(data)
      const {newVoteType, previousVoteType} = data
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      console.log(supabase)
      console.log(userId)
      console.log(commentId)
      console.log({newVoteType, previousVoteType})
      if (!userId || !supabase) {
        return comment_votes
      }

      if (previousVoteType) {
console.log("I am here")
const { data: newVotes, error } = await supabase
  .from("comment_votes")
  .update({type: newVoteType})
          .eq("user", userId)
          .eq('comment', commentId)
          .select()

          if(error) throw new Error(error.message)
      }
      else {
        console.log({newVoteType, previousVoteType})
        const { data: newVotes, error } = await supabase
          .from("comment_votes")
          .insert({
            type: newVoteType,
            user: userId,
            comment: commentId
          })
          if(error) throw new Error(error.message)
          console.log('I inserted the votes successfully')

      }
      console.log("done")
    },
    onMutate: async ({ newVoteType, previousVoteType }) => {

      const oldVoteCount = voteCount
      if (newVoteType == previousVoteType) {
        setMyVote(null)
        setVoteCount(voteCount -1)
        return
      }
      if (newVoteType === 'up') {
        setVoteCount(voteCount + 2)
      }

      if (newVoteType === 'down') {
        setVoteCount(voteCount - 2)
      }
      setMyVote(newVoteType)
      console.log("I am done here")
      // console.log({newVoteType, previousVoteType})
      // await queryClient.cancelQueries({
      //   queryKey: [`comment_votes`, commentId],
      // });
      // console.log('I cancelled the query')
      // const previousVotes = queryClient.getQueryData([
      //   `comment_votes`,
      //   commentId,
      // ]);
      // console.log(previousVotes)
      // let newVotes = [...previousVotes]
      // console.log(newVotes)

      // for (let i = 0; i < newVotes!.length; i++){
      //   let current = newVotes[i];
      //   console.log(userId)
      //   console.log(current)
      //   console.log(current.voter === userId)
      //   console.log(current.comment === commentId)
      //   if (current.voter === userId && current.comment === commentId) {
      //     console.log("I found it")
      //     console.log(current)
      //     current.type == newVoteType
      //   }
      // }
      // queryClient.setQueryData([`comment_votes`, commentId], () => newVotes);

      return { oldVoteCount }

    },
    onError: (err, { newVoteType, previousVoteType }, context) => {
      console.log(err)
      setMyVote(previousVoteType)
      setVoteCount(context?.oldVoteCount)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`comment_votes`, commentId] });
    }
  })


if(!comment_votes) return null


  if (comment_votes.length > 0) {


  }
  else {
    console.log(comment_votes)
    console.log('Lolz. You think there will be votes?')
  }

// console.log(comment_votes[0].voter, userId)
  return (
    <div className="flex items-center gap-2">
      {/* Upvote button + count */}
      <ArrowBigUp
        className={cn({
          "cursor-pointer transition-all duration-75 hover:scale-[115%] hover:text-green-400":
            userId,
          "fill-green-400 text-green-400 hover:!scale-[100%]": myVote === 'up'


        })}
        onClick={() => {
          if (userId) {
            // @ts-ignore will fix later
            vote({
              newVoteType: "up",
              previousVoteType: myVote
            });
          }
        }}
      />
      {voteCount}
      {/* Downvote button */}
      <ArrowBigDown
        className={cn({
          "cursor-pointer transition-all duration-75 hover:scale-[110%] hover:text-red-400":
            userId,
          "fill-red-400 text-red-400 hover:!scale-[100%]": myVote === 'down'

        })}
        onClick={() => {
          if (userId) {
            // @ts-ignore will fix later
            vote({
              newVoteType: "down",
              previousVoteType: myVote
            });
          }
        }}
      />
    </div>
  );
}

export default CommentVotes