import { useQuery } from '@tanstack/react-query'
import { getSingleNft } from '~/utils/queries'
import type { Nft, WithUser } from '~/utils/types'

interface useCurrentPageProps {
  slug: string,
  singlePost?: WithUser<Nft>
}

const useCurrentPage = ({ slug, singlePost}: useCurrentPageProps) => {
  return useQuery<{}, WithUser<Nft>>({
    queryKey: [slug],
    queryFn: async () => {
        const nft = await getSingleNft(slug)
      return nft
    },
    initialData:  singlePost ?? {}
  })

}

export default useCurrentPage