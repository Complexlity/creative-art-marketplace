import { useAuth } from "@clerk/nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  supabaseWithClient as supabaseClient,
  supabaseWithoutClient,
} from "~/supabase";

// import { NFT } from "~/data/nfts";

const useSupabase = () => {
  const { getToken, userId } = useAuth();
  const [supabase, setSupabase] = useState(supabaseWithoutClient);

  useEffect(() => {
    async function getSupabase() {
      try {
        const supabaseAccessToken = await getToken({
          template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        setSupabase(supabase);
      } catch (err) {
        console.log(err);
      }
    }
    getSupabase();
  }, []);
  return supabase;
};

export default useSupabase;
