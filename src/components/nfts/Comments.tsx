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
    content: "consectetur adipisicing elit. Quibusdam, earum! Neque, magnam fuga. Distinctio deleniti animi ea ducimus rem tempora.",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!
  },
  {
    content: "Lorem ipsum dolor sit amet.",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!
  },
  {
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus harum repellat recusandae",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!
  },
  {
    content: "assumenda adipisci a veniam placeat praesentium quam aliquid expedita dolore ipsam, eius repellat laboriosam sunt.",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!
  },
]
const Comments: FC<CommentsProps> = ({}) => {

    return (
      <section className="comments grid gap-6 text-center max-w-[800px] mx-auto ">
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
            className="border-1 w-full border-2   rounded-lg  !border-gray-600 bg-transparent p-2 text-sm text-white  placeholder:italic placeholder:text-gray-300 focus-visible:outline-primary focus:outline-primary focus-visible:border-primary focus- !focus:!border-none focus:ring-primary"
          />
          {/* Comment Buttton */}
          <button>
            <SendHorizontal className="text-primary hover:outline-primary" />
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
              <div className="grid gap-2 rounded-md p-2 shadow shadow-gray-400">
                <div className="font-2xl flex items-center gap-4 text-gray-200">
                  {/* User Avatar  + User Name*/}

                    <Avatar>
                      {/* @ts-expect-error src should be string */}
                      <AvatarImage src={comment.user.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  <span className="text-white font-semibold">{comment.user.name}</span>
                  {/* Time  */}
                  <span className="text-gray-400">{formatDate(comment.createdAt.raw)}</span>
                </div>
                <div className="text-start text-base text-gray-200">
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