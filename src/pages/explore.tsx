import Footer from "~/components/Universal/Footer";
import NavBar from "~/components/Universal/NavBar";
import Header  from "~/components/Universal/Header";
import CardsContainer from "~/components/Explore/CardsContainer"
import Head from "next/head";

const Explore = () => {
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
          <CardsContainer />
          <Footer />
        </div>
      </div>
    </>
  );
};


export default Explore;
