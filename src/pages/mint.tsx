import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/Universal/nav/NavBar";
import Footer from "~/components/Universal/Footer";
import Header from "~/components/Universal/Header";
import MintForm from "~/components/Mint/MintForm";

const Mint: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mint | Creative Art Marketplace</title>
        <meta
          name="description"
          content="Create you own legendary,  unique NFT"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 ">
          <NavBar />
          <Header>
            Create <span className="text-primary"> Legendary </span>NFT
          </Header>
          <MintForm />

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Mint;
