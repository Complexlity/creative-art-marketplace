import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import TextareaAutosize from "react-textarea-autosize";
import { SendHorizontal } from 'lucide-react';


interface CommentsProps {

}

const Comments: FC<CommentsProps> = ({}) => {

    return (
        <section className="related-items grid gap-12 text-center">
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
          <TextareaAutosize placeholder='Add Comments' className="w-full rounded-lg   border-1  border-gray-600 bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary placeholder:text-white"/>
          {/* Comment Buttton */}
          <button>
          <SendHorizontal className='text-primary hover:fill-primary'/>
          </button>
      </div>
      {/* Comments */}
      <div>
        <div>
          {/* User Avatar  + User Name*/}
          {/* Time  */}
        </div>
        <div>
          {/* Comment */}
        </div>
        <div>
          {/* Upvote button + count */}
          {/* Downvote button + Count */}
        </div>
      </div>
    </section>
    )
}

export default Comments