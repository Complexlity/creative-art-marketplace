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

const Home: NextPage = () => {
  const nftsData = useNftsDataContext().nftsData;
  let { data: nfts } = useNfts({});
  const sortedNfts = nfts?.sort((a, b) => a.price - b.price);

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
            <Hero sortedNfts={sortedNfts} />
            <UniqueArt sortedNfts={sortedNfts} />
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
