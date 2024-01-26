import { Database } from "~/supabase/types";
import { type Methods } from "~/components/Mint/MethodOptions";

export type NftComment = Database["public"]["Tables"]["comments"]["Row"];

export type NftBid = Database["public"]["Tables"]["bids"]["Row"];

export type NftUser = Database["public"]["Tables"]["users"]["Row"];

export type Nft = Prettify<
  Database["public"]["Tables"]["nfts"]["Row"] & { sale_type: Methods, status: "listed" | "unlisted" }
>;

export type Message = Database["public"]["Tables"]["messages"]["Row"];

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type WithUser<T> = Prettify<T & { users: NftUser }>;

export type Like = Database["public"]["Tables"]["nft_likes"]["Row"];
export type ViewCount = Database["public"]["Tables"]["nft_views"]["Row"];
export type CommentVotesFromDB =
  Database["public"]["Tables"]["comment_votes"]["Row"];
export type VoteType = "up" | "down";
export type CommentVotes = Prettify<
  Omit<CommentVotesFromDB, "type"> & { type: VoteType }
>;

export type Transactions = Database["public"]["Tables"]["transactions"]["Row"];

export type newUser = {
  username: string | null | undefined;
  userId: string | null | undefined;
  imageUrl: string | null | undefined;
  userUrl: string | null | undefined
  game_currency: number | null | undefined;
};