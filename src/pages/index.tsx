import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/Universal/NavBar";
import Hero from '~/components/Home/Hero'
import UniqueArt from "~/components/Home/UniqueArt";
import Subscribe from "~/components/Home/Subscribe";
import Footer from "~/components/Universal/Footer";
import WeeklyArtists from "~/components/Home/WeeklyArtitsts";
import { useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
  const { user } = useUser()
  console.log(user)

  console.log(user?.username)
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
          <NavBar />
          <div suppressHydrationWarning className="overflow-x-hidden">
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
