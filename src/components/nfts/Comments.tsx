import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import TextareaAutosize from "react-textarea-autosize";
import { ArrowBigDown, ArrowBigUp, ChevronDown, SendHorizontal } from 'lucide-react';
import { generateRandomDate, pickRandomItems } from '~/utils/randoms';
import { people } from '~/data/people';
import { formatDate } from '~/utils/libs';
import { motion } from 'framer-motion';


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

        <div className="flex items-center justify-between gap-2 text-2xl">
          {/* User Avatar */}
          <Avatar>
            <AvatarImage src="/people/5.webp" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* Auto sizeable text area */}
          <TextareaAutosize
            placeholder="Add Comment..."
            className="border-1 w-full   rounded-lg  border-gray-600 bg-transparent p-2 text-sm text-white  placeholder:italic placeholder:text-gray-300 focus:border-primary focus:ring-primary"
          />
          {/* Comment Buttton */}
          <button>
            <SendHorizontal className="text-primary hover:fill-primary" />
          </button>
        </div>
        {/* Comments */}

        <div className="grid gap-2">
          {comments
            .sort((a, b) => {
              // @ts-expect-error Using Date object in sorting
              return a.createdAt.raw - b.createdAt.raw;
            })
            .map((comment) => (
              <div className="grid gap-2   rounded-md p-2 shadow shadow-gray-400">
                <div className="font-2xl flex items-center gap-2 text-white">
                  {/* User Avatar  + User Name*/}
                  <div className="flex items-center gap-2">
                    <Avatar>
                      {/* @ts-expect-error src should be string */}
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
                <div className="flex items-center gap-2">
                  {/* Upvote button + count */}
                  <span className="flex gap-1">
                    <ArrowBigUp /> 24
                  </span>
                  {/* Downvote button + Count */}
                  <span className="flex gap-1">
                    <ArrowBigDown /> 24
                  </span>
                </div>
              </div>
            ))}
        </div>
        {/* View More Comments */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex gap-2 justify-self-start rounded-full bg-primary px-3 py-1 text-gray-900 hover:shadow-round hover:shadow-gray-600"
        >
          {/* Arrow Down */}
          <ChevronDown />
          View More Comments
        </motion.button>
      </section>
    );
}

export default Comments