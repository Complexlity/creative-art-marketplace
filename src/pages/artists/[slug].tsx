import Head from 'next/head'
import Footer from "~/components/Universal/Footer";
import Navbar from "~/components/Universal/Navbar";
import ArtistDetails from "~/components/artists/ArtistDetails";
import { getSingleArtist } from '~/utils/queries';
import { NftUser } from '~/utils/types';

export const getStaticPaths = async () => {
  // const nftsData = await getAllUsers();
  // const paths = nftsData.map((item) => ({
  //   params: { slug: item.slug },
  // }));
  return { paths: [], fallback: true };
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const singleArtist = await getSingleArtist(params.slug);

  return { props: { singleArtist } };
}


function ArtistPage({ singleArtist }: { singleArtist: NftUser }) {
  console.table({singleArtist})

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