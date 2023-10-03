import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { supabaseWithClient as supabaseClient } from "supabase";
import { getLikes } from "~/utils/queries";

type LikeButtonProps = {
  initialLikes: unknown[]
}


const LikeButton = ({
  initialLikes
}: LikeButtonProps) => {
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;
    // const [likedByMe, setLikedByMe] = useState(
    //   !!initialLikes.find((obj) => obj.user_id === userId)
    // );

    // const { data: likes } = useQuery({
    //   queryKey: [`likes-${currentPathname}`],
    //   queryFn: async () => await getLikes(currentPathname),
    //   initialData: initialLikes,
    // });


    // console.log(likes)
    // useEffect(() => {
    //   setLikedByMe(!!likes?.find((obj) => obj.user_id === userId));
    // }, [likes]);
  const likedByMe = true
  console.log(initialLikes)


  const { userId, getToken } = useAuth()
  const queryClient = useQueryClient()

    const { mutate: likePost } = useMutation({
      mutationKey: ["like-post"],
      mutationFn: async () => {
        if (!initialLikes) return;

        const supabaseAccessToken = await getToken({
          template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        if (!likedByMe) {
          const { data, error } = await supabase
            .from("nft_likes")
            .insert({
              user_id: userId,
              nft_slug: currentPathname,
            })
            .select();
          if (error) console.log(error);
          return data;
        } else {
          const { data, error } = await supabase
            .from("nft_likes")
            .delete()
            .eq("user_id", userId)
            .eq("nft_slug", currentPathname);
          if (error) console.log(error);
          return data;
        }
      },
      onSuccess: (data) => {
        console.log("I was a success");
        console.log(data);
        queryClient.invalidateQueries([`likes-${currentPathname}`]);
      },
    });

  return (
    <div
      // @ts-ignore cannot pass handler for ts reasons
      onClick={likePost}
      className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 hover:-translate-y-1 hover:cursor-pointer"
    >
      <AiFillHeart fill={likedByMe ? `#be123c` : ""} /> {initialLikes?.length}
    </div>
  );
}

export default LikeButton;