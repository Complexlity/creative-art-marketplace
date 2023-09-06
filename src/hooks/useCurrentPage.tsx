import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { NFT } from '~/data/nfts'
import { getSingleNft } from '~/utils/queries'

interface useCurrentPageProps {
  slug: string,
  singlePost?: NFT
}

const useCurrentPage = ({ slug, singlePost}: useCurrentPageProps) => {
  return useQuery<{}, NFT>({
    queryKey: [slug],
    queryFn: async () => {
        const nft = await getSingleNft(slug)
      return nft
    },
    initialData:  singlePost ?? {}
  })

}

export default useCurrentPage