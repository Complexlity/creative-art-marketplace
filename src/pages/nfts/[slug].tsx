import Footer from "~/components/Universal/Footer";
import NavBar from "~/components/Universal/NavBar";
import { NFT } from "~/data/nfts";

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Comments from "~/components/nfts/Comments";
import NftDetails from "~/components/nfts/NftDetails";
import { getAllNfts, getSingleNft } from "~/utils/queries";
import useCurrentPage from "~/hooks/useCurrentPage";
import { useRouter } from "next/router";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";


export const getStaticPaths = async () => {
  const nftsData = await getAllNfts() as NFT[]
  const paths = nftsData.map((item) => ({
  // @ts-expect-error Slug not a property of NFT
    params: {slug: item.slug}
}))
  return {paths, fallback: true}
}

export async function getStaticProps({ params }: { params: {slug: string} }) {
  const singlePost = await getSingleNft(params.slug)
  return {props: {singlePost}}
}

function NFTItem({ singlePost }: { singlePost: NFT }) {
  const router = useRouter()
  const slug = router.query.slug as string
  const { data } = useCurrentPage({ slug, singlePost })
  const nftData = data as unknown as NFT


  return (
    <>
      <Head>
        <title>{nftData?.name} | Creative Art Marketplace</title>
        <meta
          name="description"
          content="A place for all to discover, create and purchase unique NFTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div
          suppressHydrationWarning
          className="mx-auto max-w-[1200px]  px-6 text-white"
        >
          <NavBar />
          <NftDetails nftData={nftData}  />
          <Comments />
          {/* <RelatedItems relatedItems={relatedItems} /> */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default NFTItem;
