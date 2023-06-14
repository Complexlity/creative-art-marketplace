import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/Universal/NavBar";
import Hero from '~/components/Home/Hero'
import UniqueArt from "~/components/Home/UniqueArt";
import Subscribe from "~/components/Home/Subscribe";
import Footer from "~/components/Universal/Footer";
import WeeklyArtists from "~/components/Home/WeeklyArtitsts";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Creative Arts MarketPlace</title>
        <meta name="description" content="A place for all to discover, create and purchase unique NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main" suppressHydrationWarning>
        <div suppressHydrationWarning  className="mx-auto max-w-[1200px]  px-2 md:px-4">
        <NavBar />
          <div className="overflow-x-hidden">
            <Hero />
          <UniqueArt />
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
