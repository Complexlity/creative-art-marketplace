import { type NextPage } from "next";
import Head from "next/head";
import "react-loading-skeleton/dist/skeleton.css";
import Hero from "~/components/Home/Hero";
import Subscribe from "~/components/Home/Subscribe";
import UniqueArt from "~/components/Home/UniqueArt";
import WeeklyArtists from "~/components/Home/WeeklyArtists";
import Footer from "~/components/Universal/Footer";
import Navbar from "~/components/Universal/Navbar";
import useNfts from "~/hooks/useNfts";
import { getAllNfts } from "~/utils/queries";
import { Nft, WithUser } from "~/utils/types";

export async function getServerSideProps() {
  const serverNfts = await getAllNfts();
  return { props: { serverNfts } };
}

const Home = ({ serverNfts }: { serverNfts: WithUser<Nft>[] }) => {
  let { data: nfts } = useNfts({ serverNfts });

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
          <Navbar />
          <div suppressHydrationWarning className="overflow-x-hidden">
            {nfts && nfts.length > 0 && (
              <>
                <Hero nfts={nfts} />
                <UniqueArt nfts={[...nfts].reverse()} />
                <WeeklyArtists nfts={nfts} />
              </>
            )}
            <Subscribe />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
