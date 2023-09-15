import { Database } from "supabase_types";
import { supabaseWithoutClient as supabase } from "~/../supabase";
import { NFT } from "~/data/nfts";
import { Nft, NftBid, NftComment, NftUser } from "./types";
export async function getSingleNft(slug: string) {
  const { data } = await supabase.from("nfts").select().eq("slug", slug);
  const nft = data![0];
  return nft as unknown as NFT;
}
export async function getAllNfts() {
  const { data: nft, error } = await supabase.from("nfts").select();
  if(error) throw new Error(error.message)
  return nft as unknown as Nft[];
}

export async function getBids(slug: string) {
  let { data: bids, error } = await supabase
    .from("bids")
    .select(
      `
      "*",
      users (
        "*"
      )
      `
      )
      .eq("slug", slug);
  if (error) throw new Error(error.message)

  return bids as unknown as (NftBid & {
    users: NftUser
  })[]
}

export async function getComments(slug: string) {
  let { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
    "*",
    users (
      "*"
    )
    `
    )
    .eq("slug", slug)
    .order('created_at', { ascending: false })
  if(error) throw new Error(error.message)
  return comments as unknown as (NftComment & {
    users: NftUser
  })[]
}
