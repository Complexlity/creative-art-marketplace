
import { useAuth, useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { FC, useState } from 'react'
import { toast } from 'react-toastify';
import { supabaseWithoutClient as supabase } from 'supabase';
import { cn } from '~/utils/libs';

interface CommentVotesProps {
  commentId: number
}




const CommentVotes: FC<CommentVotesProps> = ({ commentId }) => {
  let { userId } = useAuth()
  const [votesAmt, setVotesAmt] = useState<number | null>(null)
  // userId = null
  const { data: votes, error } = useQuery({
    queryKey: [`comments-${commentId}`],
    queryFn: async () => {
      const { data: votes, error } = await supabase.from('comment_votes').select("*").eq('comment', commentId)
      return votes
    }
  })

  function vote(type: "up" | "down") {
    toast(`You voted ${type}`)
  }

  if (votes && votes.length > 0) {
    console.log('There are some votes')
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
        })}
        onClick={() => userId ? vote("up") : null}
        />

      {/* Downvote button */}
      <ArrowBigDown
        className={cn({
          "cursor-pointer transition-all duration-75 hover:scale-[110%] hover:text-red-400":
          userId,
        })}
        onClick={() => userId ? vote("down") : null}
      />
    </div>
  );
}

export default CommentVotes