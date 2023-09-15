import { useUser } from "@clerk/nextjs";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowBigDown,
  ArrowBigUp,
  ChevronDown,
  SendHorizontal,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { FC, FormEvent, FormEventHandler, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { people } from "~/data/people";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { formatDate } from "~/utils/libs";
import { getComments } from "~/utils/queries";
import { generateRandomDate, pickRandomItems } from "~/utils/randoms";

interface CommentsProps {}

const comments = [
  {
    content:
      "consectetur adipisicing elit. Quibusdam, earum! Neque, magnam fuga. Distinctio deleniti animi ea ducimus rem tempora.",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!,
  },
  {
    content: "Lorem ipsum dolor sit amet.",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!,
  },
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus harum repellat recusandae",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!,
  },
  {
    content:
      "assumenda adipisci a veniam placeat praesentium quam aliquid expedita dolore ipsam, eius repellat laboriosam sunt.",
    createdAt: generateRandomDate(),
    user: pickRandomItems(people, 1)[0]!,
  },
];
const Comments: FC<CommentsProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;
  const slug = router.query.slug as string;
  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: [`comments-${currentPathname}`],
    queryFn: async () => {
      return await getComments(currentPathname);
    },
  });

  return (
    <section className="comments mx-auto grid max-w-[800px] gap-6 text-center ">
      <h2 className="relative  text-3xl tracking-wide md:text-4xl">
        Comments
        <span className="absolute bottom-[-.3rem] right-[50%] h-[.15rem] w-[20%] max-w-[180px] translate-x-[50%] bg-primary"></span>
      </h2>

      <CreateComment />
      {/* Comments */}

      {isLoadingComments ? <p>I'm Fetching for comments</p> : null}
      {comments ? (
        <div className="grid gap-2">
          {comments.map((comment) => (
            <div className="grid gap-2 rounded-md p-2 shadow shadow-gray-400">
              <div className="font-2xl flex items-center gap-4 text-gray-200">
                {/* User Avatar  + User Name*/}

                <Avatar>
                  {/* @ts-expect-error src should be string */}
                  <AvatarImage src={comment.users.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-white">
                  {comment.users.username}
                </span>
                {/* Time  */}
                <span className="text-gray-400">
                  {formatDate(comment.created_at.raw)}
                </span>
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
      ) : (
        <div>There Are No Comments. Go Home</div>
      )}

      {comments && comments?.length > 4 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex gap-2 justify-self-start rounded-full bg-primary px-3 py-1 text-gray-900 hover:shadow-round hover:shadow-gray-600"
        >
          <ChevronDown />
          View More Comments
        </motion.button>
      ) : null}
    </section>
  );
};

function CreateComment() {
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;
  const { user } = useUser();
  const queryClient = useQueryClient();
  const supabase = useSupabase();
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  async function createComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!comment || !supabase || !user) {
      return;
    }
    setIsCommenting(true);
    const { data: newComment, error } = await supabase
      .from("comments")
      .insert({
        content: comment,
        upvotes: [],
        downvotes: [],
        userId: user?.id,
        slug: currentPathname,
      })
      .select();
    if (error) {
      toast("Something Went Wrong");
      console.log(error)
      setIsCommenting(false);
      return;
    }
    setIsCommenting(false);
    setComment("");
    toast("Comment Insert Success");
    queryClient.invalidateQueries({
      queryKey: [`comments-${currentPathname}`],
    });
  }
  if (!user) return null;
  return (
    <div className="flex items-center justify-between gap-2 text-2xl">
      {/* User Avatar */}
      <div className="creator-image relative aspect-square h-12  w-12 rounded-full border-2 border-white">
        <Image
          width={500}
          height={500}
          className="h-full w-full rounded-full object-cover object-top "
          src={user.imageUrl!}
          alt=""
        />
      </div>

      <form className="flex w-full gap-2" action="" onSubmit={createComment}>
        {/* Auto sizeable text area */}
        <TextareaAutosize
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Add Comment..."
          className="border-1 focus- !focus:!border-none   w-full  rounded-lg border-2 !border-gray-600 bg-transparent p-2  text-sm text-white placeholder:italic placeholder:text-gray-300 focus:outline-primary focus:ring-primary focus-visible:border-primary focus-visible:outline-primary"
        />
        {/* Comment Buttton */}
        <button type="submit" disabled={isCommenting}>
          {isCommenting ? (
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          ) : (
            <SendHorizontal className="text-primary hover:outline-primary" />
          )}
        </button>
      </form>
    </div>
  );
}

export default Comments;
