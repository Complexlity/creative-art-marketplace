import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/Universal/nav/NavBar";
import Hero from "~/components/Home/Hero";
import UniqueArt from "~/components/Home/UniqueArt";
import Subscribe from "~/components/Home/Subscribe";
import Footer from "~/components/Universal/Footer";
import WeeklyArtists from "~/components/Home/WeeklyArtitsts";
import { useNftsDataContext } from "~/contexts/NftsDataContext";
import useNfts from "~/hooks/useNfts";
import 'react-loading-skeleton/dist/skeleton.css'
import { Nft } from "~/utils/types";

const Home: NextPage = () => {
  let { data: nfts } = useNfts({});


  return (
    <>
      <Head>
        <title>Home | Creative Art MarketPlace</title>
        <meta
          name="description"
          content="A place for all to discover, create and purchase unique NFTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main" suppressHydrationWarning>
        <div
          suppressHydrationWarning
          className="mx-auto max-w-[1200px]  px-2 md:px-4"
        >
          <NavBar />
          <div suppressHydrationWarning className="overflow-x-hidden">
            <Hero nfts={nfts} />
            <UniqueArt nfts={nfts} />
            <WeeklyArtists />
            <Subscribe />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
