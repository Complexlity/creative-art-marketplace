import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { supabaseWithClient as supabaseClient } from "~/supabase";
import { getLikes } from "~/utils/queries";
import { Like } from "~/utils/types";

type LikeButtonProps = {
  initialLikes: Like[];
};

const LikeButton = ({ initialLikes }: LikeButtonProps) => {
  const pathname = usePathname();

  const currentPathname = pathname.split("/").pop()!;
  const { userId, getToken } = useAuth();
  const [likesAmt, setLikesAmt] = useState(initialLikes.length);
  const [likedByMe, setLikedByMe] = useState(
    !!initialLikes.find((obj) => obj.user_id === userId)
  );
  const { data: likes } = useQuery({
    queryKey: [`likes-${currentPathname}`],
    queryFn: async () => await getLikes(currentPathname),
    initialData: initialLikes,
  });

  useEffect(() => {
    setLikedByMe(!!likes?.find((obj) => obj.user_id === userId));
    setLikesAmt(likes!.length);
  }, [likes, initialLikes, userId]);

  const queryClient = useQueryClient();

  const { mutate: likePost } = useMutation({
    mutationKey: ["like-post"],
    mutationFn: async () => {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      if (!userId || !supabase) {
        throw new Error("User not found");
      }
      if (likedByMe) {
        const { data, error } = await supabase
          .from("nft_likes")
          .insert({
            user_id: userId,
            nft_slug: currentPathname,
          })
          .select();
        if (error) throw new Error("Something went wrong");
        return data;
      } else {
        const { data, error } = await supabase
          .from("nft_likes")
          .delete()
          .eq("user_id", userId)
          .eq("nft_slug", currentPathname);
        if (error) throw new Error("Something went wrong");
        return data;
      }
    },
    onMutate: () => {
      if (likedByMe) {
        setLikesAmt(likesAmt - 1);
      } else setLikesAmt(likesAmt + 1);
      setLikedByMe((prev) => !prev);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([`likes-${currentPathname}`]);
    },
    onError: () => {
      if (likedByMe) {
        setLikesAmt(likesAmt - 1);
      } else setLikesAmt(likesAmt + 1);
      setLikedByMe((prev) => !prev);
    },
  });

  return (
    <div
      // @ts-ignore cannot pass handler for ts reasons
      onClick={likePost}
      className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 hover:-translate-y-1 hover:cursor-pointer"
    >
      <AiFillHeart fill={likedByMe ? `#be123c` : ""} /> {likesAmt}
    </div>
  );
};

export default LikeButton;
