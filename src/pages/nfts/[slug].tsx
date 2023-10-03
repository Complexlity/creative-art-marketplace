import Footer from "~/components/Universal/Footer";
import NavBar from "~/components/Universal/nav/NavBar";

import Head from "next/head";
import { useRouter } from "next/router";
import Comments from "~/components/nfts/Comments";
import NftDetails from "~/components/nfts/NftDetails";
import useCurrentPage from "~/hooks/useCurrentPage";
import { getAllNfts, getLikes, getSingleNft, getViewsCount } from "~/utils/queries";
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
  const viewsCount = await getViewsCount(params.slug)
  console.log(viewsCount)
  return { props: { singlePost,initialLikes, viewsCount } };
}

function NFTItem({ singlePost, initialLikes, viewsCount }: { singlePost: WithUser<Nft>, initialLikes: Like[], viewsCount: number }) {
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
          <NftDetails nftData={nftData} initialLikes={initialLikes} viewsCount={viewsCount} />
          <Comments />
          {/* <RelatedItems relatedItems={relatedItems} /> */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default NFTItem;
