import { supabaseWithoutClient as supabase } from "~/../supabase";
import { Nft, NftBid, NftComment, WithUser } from "./types";


export async function getSingleNft(slug: string) {
  const { data } = await supabase.from("nfts").select().eq("slug", slug);
  const nft = data![0];
  return nft!
}



export async function getAllNfts() {
  const { data: nft, error } = await supabase.from("nfts").select();
  if(error) throw new Error(error.message)
  return nft!
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

  return bids as unknown as WithUser<NftBid>[]
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
  return comments as unknown as WithUser<NftComment>[]
}


export async function getPendingBids(id: string) {
  // let { data: bids, error } = await supabase.rpc('getUserBids')
  console.log(id)
  id = "user_2UtUVf6NX3m2B3WX7NXKNP579x7";
  let { data: bids, error } = await supabase
    .from("bids")
    .select(
      `
    "*",
    nfts!inner(
      "*"
    ),
    users (
      "*"
    )
    `
    )
    .eq("nfts.user_id", id).eq('status', "pending");
  console.log(bids, error)
  return bids as unknown as (WithUser<NftBid> & {
    nfts: Nft
  }) []
}

export async function getMessages(id: string) {
  let { data: messages, error } = await supabase.from('messages').select("*")
  return messages
}
