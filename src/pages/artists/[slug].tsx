import Head from 'next/head'
import Footer from "~/components/Universal/Footer";
import Navbar from "~/components/Universal/Navbar";
import ArtistDetails from "~/components/artists/ArtistDetails";

function ArtistPage() {

  return (
    <>
      <Head>
        <title>Artitst | Creative Art Marketplace</title>
        <meta
          name="description"
          content="A place for all to discover, create and purchase unique NFTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div
          suppressHydrationWarning
          className="mx-auto max-w-[1200px]  px-6 text-white"
        >
          <Navbar />
          <ArtistDetails />

          <Footer />
        </div>
      </div>
    </>
  );
}
  export default ArtistPage