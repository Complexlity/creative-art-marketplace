import { supabaseWithoutClient as supabase } from '~/../supabase'
export async function getSingleNft(slug: string){
  const { data } = await supabase.from('nft').select().eq('slug', slug)
  const nft = data![0]
  console.log(nft)
  return nft
}
export  async function getAllNfts(){
  const { data: nft } = await supabase.from('nft').select()
  return nft
}