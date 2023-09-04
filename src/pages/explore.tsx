import Footer from "~/components/Universal/Footer";
import NavBar from "~/components/Universal/NavBar";
import Header  from "~/components/Universal/Header";
import CardsContainer from "~/components/Explore/CardsContainer"
import Head from "next/head";
import useSupabase from "~/hooks/useSupabase";
import { useQuery } from '@tanstack/react-query'

import supabaseClient from "~/../supabase";
import { useAuth } from "@clerk/nextjs";
import { NFT } from "~/data/nfts";
import useGetNfts from "~/hooks/useGetNfts";


const Explore = () => {
  const { data: nfts, isLoading } = useGetNfts()
  return (
    <>
      <Head>
        <title>Explore | Creative Art Marketplace</title>
        <meta
          name="description"
          content="Discover all unique NFTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div className="mx-auto max-w-[1200px] px-4 text-white md:px-8">
          <NavBar />
          <Header>Explore</Header>
          {isLoading ? "Loading Nfts" : nfts ?  <CardsContainer nftsData={nfts} /> : null}
          <Footer />
        </div>
      </div>
    </>
  );
};


export default Explore;
