import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "~/components/Universal/NavBar";
import Footer from "~/components/Universal/Footer";
import { NFT } from "~/data/nfts";
import { people, People } from "~/data/people";
import { useNftsDataContext, } from "~/contexts/DataContext";
import { RelatedItems } from "~/components/nfts/RelatedItems";
import NftDetails from '~/components/nfts/NftDetails'
import {pickRandomItems} from '~/utils/randoms'






function NFTItem() {
  const router = useRouter();
  const nftsData = useNftsDataContext().nftsData;
  const id = router.query.id;
  const randomPeople = pickRandomItems(people, 4) as People[];
  const nftData = nftsData.find((item) => id === item.id) as NFT;
  let relatedItems = nftsData.filter((item) => id !== item.id);
  relatedItems = pickRandomItems(relatedItems, 6) as NFT[];

  return (
    <div className="main space-y-12 px-6 text-white">
      <NavBar />
      <NftDetails nftData={nftData} randomPeople={randomPeople} />
      <RelatedItems relatedItems={relatedItems} />
      <Footer />
    </div>
  );
}

export default NFTItem;
