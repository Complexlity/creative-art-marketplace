import { supabaseWithoutClient as supabase } from '~/../supabase'
import { NFT } from '~/data/nfts'
export async function getSingleNft(slug: string) {
  const { data } = await supabase.from('nfts').select().eq('slug', slug)
  const nft = data![0]
  return nft as unknown as NFT
}
export async function getAllNfts() {
  const { data: nft } = await supabase.from('nfts').select()
  return nft as unknown as NFT[]
}

export async function getBids(slug: string) {
  let { data: bids, error } = await supabase.from("bids").select(`
      "*",
      placer (
        "*"
      )
    `).eq('nftSlug', slug);
  console.log(bids)
return bids
}
