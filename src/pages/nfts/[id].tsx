import React from "react";
import { useRouter } from "next/router";
import NavBar from "~/components/Universal/NavBar";
import Footer from "~/components/Universal/Footer";
import { NFT } from "~/data/nfts";
import { people, People } from "~/data/people";
import { useNftsDataContext } from "~/contexts/NftsDataContext";
import RelatedItems  from "~/components/nfts/RelatedItems";
import NftDetails from "~/components/nfts/NftDetails";
import { pickRandomItems } from "~/utils/randoms";
import Head from "next/head";

function NFTItem() {
  const router = useRouter();
  const nftsData = useNftsDataContext().nftsData;
  const id = router.query.id;
  const randomPeople = pickRandomItems(people, 4) as People[];
  const nftData = nftsData.find((item) => id === item.id) as NFT;
  let relatedItems = nftsData.filter((item) => id !== item.id);
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
