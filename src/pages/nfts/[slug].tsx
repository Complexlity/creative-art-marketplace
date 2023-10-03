import Footer from "~/components/Universal/Footer";
import NavBar from "~/components/Universal/nav/NavBar";

import Head from "next/head";
import { useRouter } from "next/router";
import Comments from "~/components/nfts/Comments";
import NftDetails from "~/components/nfts/NftDetails";
import useCurrentPage from "~/hooks/useCurrentPage";
import { getAllNfts, getLikes, getSingleNft } from "~/utils/queries";
import { Like, Nft, WithUser } from "~/utils/types";

export const getStaticPaths = async () => {
  const nftsData = await getAllNfts();
  const paths = nftsData.map((item) => ({
    params: { slug: item.slug },
  }));
  return { paths, fallback: true };
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const singlePost = await getSingleNft(params.slug);
  const initialLikes = await getLikes(params.slug)
  return { props: { singlePost,initialLikes } };
}

function NFTItem({ singlePost, initialLikes }: { singlePost: WithUser<Nft>, initialLikes: Like[] }) {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { data } = useCurrentPage({ slug, singlePost });
  const nftData = data as unknown as WithUser<Nft>;

  return (
    <>
      <Head>
        <title>{nftData?.name} | Creative Art Marketplace</title>
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
          <NavBar />
          <NftDetails nftData={nftData} initialLikes={initialLikes} />
          <Comments />
          {/* <RelatedItems relatedItems={relatedItems} /> */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default NFTItem;
