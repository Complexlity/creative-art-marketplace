import { supabaseWithoutClient as supabase } from "~/supabase";
import { Nft, NftBid, NftComment, NftUser, WithUser } from "./types";

export async function getSingleNft(slug: string) {
  const { data } = await supabase
    .from("nfts")
    .select(
      `
  "*",
  users (
    "*"
  )`
    )
    .eq("slug", slug);
  const nft = data![0];
  return nft! as unknown as WithUser<Nft>;
}

export async function getAllNfts() {
  const { data: nfts, error } = await supabase.from("nfts").select(
    `
    "*",
    users(
      "*"
    )`
  );

  if (error) throw new Error(error.message);
  return nfts! as unknown as WithUser<Nft>[];
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
  if (error) throw new Error(error.message);

  return bids as unknown as WithUser<NftBid>[];
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
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return comments as unknown as WithUser<NftComment>[];
}

export async function getPendingBids(id: string) {
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
    .eq("nfts.user_id", id)
    .eq("status", "pending");

  return bids as unknown as (WithUser<NftBid> & {
    nfts: WithUser<Nft>;
  })[];
}

export async function getMessages(id: string) {
  let { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", id);
  return messages;
}

export async function getLikes(slug: string) {
  const { data: likes, error } = await supabase
    .from("nft_likes")
    .select("*")
    .eq("nft_slug", slug);
  return likes;
}

export async function getViewsCount(slug: string) {
  const { data: views, error } = await supabase
    .from("nft_views")
    .select("*")
    .eq("nft_slug", slug);
  if (!views || views.length === 0) return null;
  return views[0]!.views_count;
}

export async function getSingleArtist(slug: string) {
  const { data: user, error } = await supabase.from("users").select("*").eq("user_url", slug)
  if (!user || user.length === 0) return null

  return user[0] as NftUser
}

export async function getNftsByUserId(userId: string) {
  const { data: artistNfts, error } = await supabase.from("nfts").select("*").eq("user_id", userId)
  if (!artistNfts || artistNfts.length === 0) return null
  return artistNfts as Nft[]
}