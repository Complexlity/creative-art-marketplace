import { useQuery } from "@tanstack/react-query";
import { getAllNfts, getSingleNft } from "~/utils/queries";
import type { Nft, WithUser } from "~/utils/types";

interface useCurrentPageProps {
  serverNfts?: WithUser<Nft>[];
}

const useCurrentPage = ({ serverNfts }: useCurrentPageProps) => {
  return useQuery({
    queryKey: [`nfts`],
    queryFn: async () => {
      return await getAllNfts();
    },
    initialData: serverNfts,
  });
};

export default useCurrentPage;
