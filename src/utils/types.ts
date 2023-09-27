import { Database } from "supabase_types";


export type NftComment = Database['public']['Tables']['comments']['Row']

export type NftBid = Database["public"]["Tables"]["bids"]["Row"];


export type NftUser = Database["public"]["Tables"]["users"]["Row"];

export type Nft = Database["public"]["Tables"]["nfts"]["Row"];

export type Message = Database["public"]['Tables']["messages"]['Row']

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type WithUser<T> = Prettify<T & { users: NftUser }>;