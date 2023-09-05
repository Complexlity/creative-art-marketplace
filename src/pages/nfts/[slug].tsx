import Footer from "~/components/Universal/Footer";
import NavBar from "~/components/Universal/NavBar";
import { NFT } from "~/data/nfts";

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Comments from "~/components/nfts/Comments";
import NftDetails from "~/components/nfts/NftDetails";
import { getAllNfts, getSingleNft } from "~/utils/queries";


export const getStaticPaths = async () => {

  const nftsData = await getAllNfts() as NFT[]
  console.log(nftsData)
  const paths = nftsData.map((item) => ({
  // @ts-expect-error Slug not a property of NFT
    params: {slug: item.slug}
}))
  console.log(paths)
  return {paths, fallback: true}
}

export async function getStaticProps({ params }: { params: {slug: string} }) {
  const singlePost = await getSingleNft(params.slug)
  console.log(singlePost)
  return {props: {singlePost}}
}

function NFTItem({ singlePost, params }: {singlePost: NFT, params: {slug: string}}) {
  const { data: nftData } = useQuery({
    queryKey: ['nftData'],
    queryFn: async () => {
      const { data } = await getSingleNft(params.slug)
      return data
    },
    initialData:  singlePost
  })
  console.log(nftData)
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
