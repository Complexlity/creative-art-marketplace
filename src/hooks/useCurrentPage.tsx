import { useQuery } from '@tanstack/react-query'
import { getSingleNft } from '~/utils/queries'
import { Nft } from '~/utils/types'

interface useCurrentPageProps {
  slug: string,
  singlePost?: Nft
}

const useCurrentPage = ({ slug, singlePost}: useCurrentPageProps) => {
  return useQuery<{}, Nft>({
    queryKey: [slug],
    queryFn: async () => {
        const nft = await getSingleNft(slug)
      return nft
    },
    initialData:  singlePost ?? {}
  })

}

export default useCurrentPage