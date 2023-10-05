import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, SendHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import useSupabase from "~/hooks/useSupabaseWithAuth";

export default function CommentInput() {
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
        user_id: user.id,
        slug: currentPathname,
      })
      .select();
    if (error) {
      toast("Something Went Wrong");
      console.log(error);
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
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : (
            <SendHorizontal className="text-primary hover:outline-primary" />
          )}
        </button>
      </form>
    </div>
  );
}
