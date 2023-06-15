import React from "react";
import { useRouter } from "next/router";
import NavBar from "~/components/Universal/NavBar";
import Footer from "~/components/Universal/Footer";
import { NFT } from "~/data/nfts";
import { people, People } from "~/data/people";
import { useNftsDataContext } from "~/contexts/NftsDataContext";
import RelatedItems  from "~/components/nfts/RelatedItems";
import NftDetails from "~/components/nfts/NftDetails";
import { generateRandomNFTPrice, generateRandomTimeDifference, pickRandomItems } from "~/utils/randoms";
import Head from "next/head";
import { partialNFTsData } from "~/data/nfts";

const nftsData: NFT[] = partialNFTsData.map((item) => {
  item.endTime = generateRandomTimeDifference();
  item.price = generateRandomNFTPrice();
  return item as NFT;
});


export const getStaticPaths = () => {
  const paths = nftsData.map((item) => ({
    params: {id: item.id}
  }))
  return {paths, fallback: true}
}

export function getStaticProps({ params }: { params: any }) {
  const nftData = nftsData.find(item => item.id === params.id)

  return { props: { nftData } }
}
// const router = useRouter();
// const nftsData = useNftsDataContext().nftsData;
// const nftData = nftsData.find((item) => id === item.id) as NFT;
// const id = router.query.id;
function NFTItem({ nftData}: { nftData: NFT}) {
  const randomPeople = pickRandomItems(people, 4) as People[];
  let relatedItems = nftsData.filter((item) => nftData.id !== item.id);
  relatedItems = pickRandomItems(relatedItems, 6) as NFT[];

  return (
    <>
      <Head>
        <title>{nftData.name} | Creative Art Marketplace</title>
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
          <NftDetails nftData={nftData} randomPeople={randomPeople} />
          <RelatedItems relatedItems={relatedItems} />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default NFTItem;
