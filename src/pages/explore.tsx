import Head from "next/head";
import CardsContainer from "~/components/Explore/CardsContainer";
import Footer from "~/components/Universal/Footer";
import Header from "~/components/Universal/Header";
import NavBar from "~/components/Universal/NavBar";
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
