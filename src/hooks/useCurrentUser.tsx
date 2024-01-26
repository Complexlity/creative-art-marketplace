import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { supabaseWithoutClient as supabase } from "~/supabase";
import { newUser } from "~/utils/types";

type useCurrentUserProps = {
  userId?: string | null;
};



const useCurrentUser = ({ userId }: useCurrentUserProps) => {
  let authUserId: string | null | undefined;
  if (!userId) {
    authUserId = useAuth().userId;
  }
  const userOrAuthUserId = userId ?? authUserId;

  return useQuery({
    queryKey: [userOrAuthUserId],
    queryFn: async (): Promise<newUser> => {
      if (!userOrAuthUserId) {
        return {
          username: null,
          userId: null,
          imageUrl: null,
          userUrl: null,
          game_currency: null,
        };
      }
      const { data: users, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userOrAuthUserId);

      //User found in db
      if (users && users.length > 0) {
        const user = users[0]!;
        return {
          username: user.username,
          userId: user.user_id,
          imageUrl: user.imageUrl,
          userUrl: user.user_url,
          game_currency: user.game_currency,
        };
      }

      // Check server side
      const res = await fetch("/api/current_user", {
        method: "POST",
        body: userOrAuthUserId,
      });
      const result = await res.json();
      const user = result.user as newUser;

      return user;
    },
  });
};

export default useCurrentUser;
