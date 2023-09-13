import { useQuery } from '@tanstack/react-query';
import { getBids } from '~/utils/queries';
import { usePathname } from 'next/navigation';
interface useNftBidsProps {
currentPathname: string
}

function useNftBids({ currentPathname }: useNftBidsProps) {
  return useQuery({
    queryKey: ["bids", currentPathname],
    queryFn: async () => {
      return await getBids(currentPathname)
    }
  });
}

export default useNftBids