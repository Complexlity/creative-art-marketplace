import { FC } from 'react'
import useSupabase from "~/hooks/useSupabase";
import { useQuery } from "@tanstack/react-query";

import supabaseClient from "~/../supabase";
import { useAuth } from "@clerk/nextjs";
import { NFT } from "~/data/nfts";

interface useGetNftsProps {

}

const useGetNfts = () => {
  const { getToken, userId } = useAuth();

  const getSupabase = async () => {
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    return supabase;
  };
  async function getNfts() {
    const supabase = await getSupabase();
    let { data: nfts, error } = await supabase.from("nft").select("*");

    return nfts as unknown as NFT[];
  }
  return useQuery({
    queryKey: ["posts"],
    queryFn: getNfts,
  });
}

export default useGetNfts