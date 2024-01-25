import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { supabaseWithoutClient as supabase } from "~/supabase";

type useCurrentUserProps = {
  userId?: string | null;
};

type User = {
  username: string | null | undefined;
  userId: string | null | undefined;
  imageUrl: string | null | undefined;
  game_currency: number | null | undefined;
};

const useCurrentUser = ({ userId }: useCurrentUserProps) => {
  let authUserId: string | null | undefined;
  if (!userId) {
    authUserId = useAuth().userId;
  }
  const userOrAuthUserId = userId ?? authUserId;

  return useQuery({
    queryKey: [userOrAuthUserId],
    queryFn: async (): Promise<User> => {
      if (!userOrAuthUserId) {
        return {
          username: null,
          userId: null,
          imageUrl: null,
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
          game_currency: user.game_currency,
        };
      }

      // Check server side
      const res = await fetch("/api/current_user", {
        method: "POST",
        body: userOrAuthUserId,
      });
      const result = await res.json();
      const user = result.user as User;

      return user;
    },
  });
};

export default useCurrentUser;
