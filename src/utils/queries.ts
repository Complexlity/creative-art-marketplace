import { supabaseWithoutClient as supabase } from '~/../supabase'
import { NFT } from '~/data/nfts'
export async function getSingleNft(slug: string){
  const { data } = await supabase.from('nft').select().eq('slug', slug)
  const nft = data![0]
  console.log(nft)
  return nft
}
export  async function getAllNfts(){
  const { data: nft } = await supabase.from('nft').select()
  console.log(nft)
  return nft as unknown as NFT[]
}

export async function getBids() {

let { data: bids, error } = await supabase.from("bids").select("*");
return bids
}
