import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabaseWithAuth";
import { useAuth } from "@clerk/nextjs";
import { supabaseWithClient as supabaseClient } from "supabase";
import { formatDate } from "~/utils/libs";

export default function useTransactions() {
  const { getToken, userId } = useAuth();

  return useQuery({
    queryKey: ["transactions"],

		queryFn: async () => {
			console.log("I will fetch transactions")
			const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken)
      let { data: transactions, error } = await supabase!
        .from("transactions")
        .select("*")
				.eq('user_id', userId!);
      return transactions;
    },
  });

}

