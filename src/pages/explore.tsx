import Head from "next/head";
import CardsContainer from "~/components/Explore/CardsContainer";
import Footer from "~/components/Universal/Footer";
import Header from "~/components/Universal/Header";
import Navbar from "~/components/Universal/Navbar";
import useNfts from "~/hooks/useNfts";
import { getAllNfts } from "~/utils/queries";
import { Nft, WithUser } from "~/utils/types";

export async function getServerSideProps() {
  const serverNfts = await getAllNfts();
  return { props: { serverNfts } };
}

type ExploreProps = {
  serverNfts: WithUser<Nft>[];
};

const Explore = ({ serverNfts }: ExploreProps) => {
  const { data: nfts } = useNfts({ serverNfts });

  return (
    <>
      <Head>
        <title>Explore | Creative Art Marketplace</title>
        <meta name="description" content="Discover all unique NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col px-4 text-white md:px-8">
          <Navbar />
          <Header>Explore</Header>
          <CardsContainer nftsData={[...nfts!].reverse()} />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Explore;
