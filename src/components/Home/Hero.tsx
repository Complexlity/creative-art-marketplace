import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CountDownComponent from "~/components/Universal/Countdown";
import MktIcon from "~/components/Universal/MktIcon";
import { Nft } from "~/utils/types";


type HeroProps = {
  nfts?: Nft[]
}

const Hero = ({ nfts: nftsData }: HeroProps) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const heroItem = nftsData && nftsData![nftsData!.length - 1]
  if(heroItem) console.log({heroItem})

  return (
    <section className="mb-24 px-1 py-2 md:grid md:grid-cols-2 md:py-6">
      <div className=" mb-6 space-y-8 text-center text-white  md:max-w-[60ch] md:text-start">
        <h1 className=" text-6xl">
          Discover and Collect The Best NFTs{" "}
          <span className="text-primary">Digital Art.</span>
        </h1>
        <p>
          Get started with the easiest and most secure platform to buy and trade
          digital ART and NFT&apos;s. Start exploring the world of digital art
          and NFTs today and take control of your digital assets with confidence
        </p>
        <div className="flex justify-center gap-4 font-bold md:justify-start">
          <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              className=" rounded-lg bg-primary px-5 py-2 text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:px-11 md:py-3"
            >
              Explore Now
            </motion.button>
          </Link>
          <button className="">
            <span className="py-1 text-xl hover:border-b-4 hover:border-primary">
              Learn More
            </span>
          </button>
        </div>
        <CountingDiv className="hidden md:-ml-12 md:flex" />
      </div>

      {nftsData ? (
        <div className="">
          <div className="relative mx-auto h-[400px] w-[80%] max-w-[350px] ">
            <div className="absolute left-[20%] right-0 top-[85%] z-20 mx-auto grid w-[220px] scale-[80%] gap-2 rounded-2xl border border-t-2 border-gray-600 border-t-primary bg-blue-950 px-2 py-2 md:left-[40%] md:mx-4 lg:scale-[100%]">
              <p className="flex justify-between text-primary">
                <span>Starts in</span>
                <span>Current bid</span>
              </p>
              <p className="flex justify-between font-bold text-white">
                <span>
                  <CountDownComponent
                    fromInput={true}
                    start_date={heroItem!.start_date} />
                </span>
                <span suppressHydrationWarning={true}>
                  <MktIcon />
                  {heroItem?.price}
                </span>
              </p>
              <Link href={`/nfts/${heroItem?.slug}`} className="grid">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1 rounded-lg border border-primary py-2 font-bold text-primary transition-all duration-200 ease-in hover:scale-[103%] hover:bg-primary hover:text-gray-800"
                >
                  Place A Bid
                </motion.button>
              </Link>
            </div>
            <div
              className={`${
                loaded && heroItem && heroItem.image ? "" : "hidden"
              } gradient absolute right-[43%] top-[30%] h-[50%] w-1/2 rotate-45 rounded-full shadow-3xl shadow-primary`}
            ></div>
            <Image
              width={20}
              height={20}
              suppressHydrationWarning={true}
              alt="Trending Image"
              className="relative z-10 mx-auto h-full w-full max-w-[500px] rounded-2xl object-cover object-top"
              src={heroItem!.image}
              priority
              unoptimized
              onLoad={setLoaded.bind(null, true)}
            />
          </div>
        </div>
      ) : (
        <FeaturedSkeleton />
      )}
      <CountingDiv className="mx-auto mt-32 flex md:hidden" />
    </section>
  );
};

type Props = {
  className: string;
};
function CountingDiv({ className }: Props) {
  return (
    <div
      className={`countingDiv justify-center font-bold text-white ${className}`}
    >
      <div className="flex flex-1 flex-col justify-between border-r border-r-primary text-center">
        <p className="text-3xl">
          <span className="text-primary">120</span>K
        </p>
        <p>Art works</p>
      </div>
      <div className="flex flex-1 flex-col justify-between border-r border-r-primary text-center">
        <p className="text-3xl">
          <span className="text-3xl  text-primary">8.9</span>K
        </p>
        <p>Artists</p>
      </div>
      <div className="flex flex-1 flex-col justify-between text-center">
        <p className="text-3xl">
          <span className="text-3xl text-primary">65</span>K
        </p>
        <p>Collections</p>
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <SkeletonTheme baseColor="#172554" highlightColor="hsl(74deg, 89%, 76%)">
      <div className="">
        <div className="relative mx-auto h-[400px] w-[80%] max-w-[350px] ">
          <Skeleton className="h-full w-full !rounded-3xl" />
          <div className="absolute left-[20%]  right-0 top-[85%] z-20 mx-auto grid min-h-[120px] w-[220px] scale-[80%] gap-2 rounded-2xl md:left-[40%] md:mx-4  lg:scale-[100%]">
            <Skeleton className="!h-full !w-full !rounded-2xl" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}


export default Hero;
