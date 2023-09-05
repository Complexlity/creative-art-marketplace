import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabaseWithClient as supabaseClient } from "~/../supabase";
// import { NFT } from "~/data/nfts";

const useSupabase = () => {
  const { getToken, userId } = useAuth();
  const [supabase, setSupabase] = useState<any>();


    useEffect(() => {
      async function getSupabase() {
    try {
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
      const supabase = await supabaseClient(supabaseAccessToken);
    setSupabase(supabase);

        } catch (err) {
          setSupabase(null)
        }
      }
      getSupabase();
    }, []);
    return supabase
  };


export default useSupabase