
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { FC } from 'react'

interface CommentVotesProps {

}

const CommentVotes: FC<CommentVotesProps> = ({}) => {
  return (
    <div className="flex items-center gap-2">
  {/* Upvote button + count */}
  <ArrowBigUp /> 24
  {/* Downvote button */}
  <ArrowBigDown />
</div>
  )
}

export default CommentVotes