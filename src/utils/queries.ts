import { supabaseWithoutClient as supabase } from '~/../supabase'
import { supabaseWithClient as supabase2 } from '~/../supabase'
import { NFT } from '~/data/nfts'
export async function getSingleNft(slug: string) {
  console.log(supabase)
  const { data } = await supabase.from('nft').select().eq('slug', slug)
  const nft = data![0]
  return nft as unknown as NFT
}
export async function getAllNfts() {
  const { data: nft } = await supabase.from('nft').select()
  return nft as unknown as NFT[]
}

export async function getBids() {

let { data: bids, error } = await supabase.from("bids").select("*");
return bids
}
