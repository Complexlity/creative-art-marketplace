import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import TextareaAutosize from "react-textarea-autosize";
import { ArrowBigDown, ArrowBigUp, SendHorizontal } from 'lucide-react';
import { generateRandomDate, pickRandomItems } from '~/utils/randoms';
import { people } from '~/data/people';
import { formatDate } from '~/utils/libs';


interface CommentsProps {

}

const comments = [
  {
    content: "Hello world",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!
  },
  {
    content: "This item is very good",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!
  },
  {
    content: "I will keep using this for my daily activities",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!
  },
  {
    content: "I want you to understand how I work",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!
  },
]
const Comments: FC<CommentsProps> = ({}) => {

    return (
        <section className="comments grid gap-6 text-center">
      <h2 className="relative  text-3xl tracking-wide md:text-4xl">
        Comments
        <span className="absolute bottom-[-.3rem] right-[50%] h-[.15rem] w-[20%] max-w-[180px] translate-x-[50%] bg-primary"></span>
        </h2>

      <div className='flex text-2xl gap-2 justify-between items-center' >
          {/* User Avatar */}
          <Avatar>
  <AvatarImage src="/people/5.webp" />
  <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* Auto sizeable text area */}
          <TextareaAutosize placeholder='Add Comment...' className="w-full rounded-lg   border-1  border-gray-600 bg-transparent p-2 text-sm text-white  focus:border-primary focus:ring-primary placeholder:text-gray-300 placeholder:italic"/>
          {/* Comment Buttton */}
          <button>
          <SendHorizontal className='text-primary hover:fill-primary'/>
          </button>
      </div>
        {/* Comments */}

        <div className="grid gap-2">
        {/* @ts-expect-error Using date object in sorting */}
        {comments.sort((a,b) => a.createdAt.raw - b.createdAt.raw).map((comment) => (

          <div className="gap-2 grid   shadow shadow-gray-400 p-2 rounded-md">
        <div className="text-white font-2xl flex gap-2 items-center">
              {/* User Avatar  + User Name*/}
              <div className="flex items-center gap-2">
                <Avatar>
  <AvatarImage src={comment.user.image} />
  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {comment.user.name}
          </div>
              {/* Time  */}
              <span>{formatDate(comment.createdAt.raw)}</span>
        </div>
        <div className="text-start">
              {/* Comment */}
              {comment.content}
        </div>
        <div className="flex gap-2 items-center">
              {/* Upvote button + count */}
              <span className="flex gap-1"><ArrowBigUp/> 24</span>
          {/* Downvote button + Count */}
              <span className="flex gap-1"><ArrowBigDown/> 24</span>
        </div>
      </div>
        ))}
          </div>
    </section>
    )
}

export default Comments