import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { FC, MouseEventHandler, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { formatDate } from "~/utils/libs";
import { getComments } from "~/utils/queries";
import CommentInput from "./CommentInput";
import CommentVotes from "./CommentVotes";

type CommentsProps = {}

const Comments: FC<CommentsProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;
  const slug = router.query.slug as string;
  const [shownComments, setShownComments] = useState(4);

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: [`comments-${currentPathname}`],
    queryFn: async () => {
      return await getComments(currentPathname);
    },
  });

  function toggleCommentLength() {
    if (shownComments === 4) {
      setShownComments(comments!.length);
    } else {
      setShownComments(4);
    }
  }

  return (
    <section className="comments mx-auto grid max-w-[800px] gap-6 text-center ">
      <h2 className="relative  text-3xl tracking-wide md:text-4xl">
        Comments
        <span className="absolute bottom-[-.3rem] right-[50%] h-[.15rem] w-[20%] max-w-[180px] translate-x-[50%] bg-primary"></span>
      </h2>

      <CommentInput />
      {/* Comments */}

      {isLoadingComments ? <p>I'm Fetching for comments</p> : null}
      {comments ? (
        <div className="grid gap-2">
          {comments.slice(0, shownComments).map((comment) => (
            <div
              key={comment.id}
              className="grid gap-2 rounded-md p-2 shadow shadow-gray-400"
            >
              <div className="font-2xl flex items-center gap-4 text-gray-200">
                {/* User Avatar  + User Name*/}

                <Avatar>
                  <AvatarImage src={comment.users.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-white">
                  {comment.users.username}
                </span>
                {/* Time  */}
                <span className="text-gray-400">
                  {/* @ts-ignore raw not found */}
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <div className="text-start text-base text-gray-200">
                {/* Comment */}
                {comment.content}
              </div>
              <CommentVotes commentId={comment.id} />
            </div>
          ))}
        </div>
      ) : (
        <div>There Are No Comments. Go Home</div>
      )}
      <button></button>

      {comments && comments?.length > 4 ? (
        <motion.button
          onClick={toggleCommentLength}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex gap-2 justify-self-start rounded-full bg-primary px-3 py-1 text-gray-900 hover:shadow-round hover:shadow-gray-600"
        >
          {
            shownComments === 4
              ?
              <>
          <ChevronDown />
          View More Comments
              </>
              :
              <>
          <ChevronUp />
          Show Less Comments
              </>
        }
        </motion.button>
      ) : null}
    </section>
  );
};


export default Comments