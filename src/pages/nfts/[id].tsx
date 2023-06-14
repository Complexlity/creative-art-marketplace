import React from "react";
import { useRouter } from "next/router";
import NavBar from "~/components/Universal/NavBar";
import Footer from "~/components/Universal/Footer";
import { NFT } from "~/data/nfts";
import { people, People } from "~/data/people";
import { useNftsDataContext } from "~/contexts/NftsDataContext";
// import RelatedItems  from "../../components/Nfts/RelatedItems";
import NftDetails from "~/components/Nfts/NftDetails";
import { pickRandomItems } from "~/utils/randoms";
import Head from "next/head";
// import { NFT } from "~/data/nfts";
import Card from "~/components/Universal/Card";

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


function RelatedItems({
  relatedItems,
}: {
  relatedItems: NFT[];
}) {
  return (
    <section className="related-items grid gap-12 text-center">
      <h2 className="relative  text-3xl tracking-wide md:text-4xl">
        Related Items
        <span className="absolute bottom-[-.3rem] right-[50%] h-[.15rem] w-[20%] max-w-[180px] translate-x-[50%] bg-primary"></span>
      </h2>
      <div
        suppressHydrationWarning={true}
        className="related-cards grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {relatedItems.map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}


export default NFTItem;
