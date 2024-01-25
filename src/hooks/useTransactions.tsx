import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { supabaseWithClient as supabaseClient } from "~/supabase";

export default function useTransactions() {
  const { getToken, userId } = useAuth();

  return useQuery({
    queryKey: ["transactions"],

    queryFn: async () => {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      let { data: transactions, error } = await supabase!
        .from("transactions")
        .select("*")
        .eq("user_id", userId!);

      return transactions;
    },
  });
}
