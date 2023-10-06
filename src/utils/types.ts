import { Database } from "supabase_types";


export type NftComment = Database['public']['Tables']['comments']['Row']

export type NftBid = Database["public"]["Tables"]["bids"]["Row"]

export type NftUser = Database["public"]["Tables"]["users"]["Row"];

export type Nft = Database["public"]["Tables"]["nfts"]["Row"];

export type Message = Database["public"]['Tables']["messages"]['Row']

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type WithUser<T> = Prettify<T & { users: NftUser }>;

export type Like = Database['public']['Tables']['nft_likes']['Row']
export type ViewCount = Database['public']['Tables']['nft_views']['Row']
export type CommentVotesFromDB = Database['public']['Tables']['comment_votes']['Row']
export type VoteType = "up" | "down";
export type CommentVotes = (Omit<CommentVotesFromDB, 'type'>) & {type: VoteType}