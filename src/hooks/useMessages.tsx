import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { supabaseWithClient as supabaseClient } from "~/supabase";

export default function useMessages() {
  const { getToken, userId } = useAuth();

  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      let { data: messages, error } = await supabase!
        .from("messages")
        .select("*")
        .eq("user_id", userId!);
      return messages;
    },
  });
}
