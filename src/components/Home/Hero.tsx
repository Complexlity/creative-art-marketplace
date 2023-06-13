import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useNftsDataContext } from "~/utils/DataContext";
import CountDownComponent from "~/components/General/Countdown";
import {motion} from 'framer-motion'

const Hero = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const nftsData = useNftsDataContext().nftsData;

  return (
    <section className="mb-24 py-6 md:grid md:grid-cols-2 px-1">
      <div className=" mb-6 space-y-8 text-center text-white  md:text-start md:max-w-[60ch]">
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
          <motion.button
          whileHover={{scale: 1.01}}
          whileTap={{scale: 0.95}}
          className=" rounded-lg bg-primary px-5 py-2 text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:px-11 md:py-3">
            Explore Now
          </motion.button>
          <button className="">
            <span className="py-1 text-xl hover:border-b-4 hover:border-primary">
              Learn More
            </span>
          </button>
        </div>
        <CountingDiv className="hidden md:-ml-12 md:flex" />
      </div>

      <div className="">
        <div className="relative mx-auto h-[400px] w-[80%] max-w-[350px] ">
          <div className="absolute left-[20%] right-0 top-[85%] z-20 mx-auto grid w-[220px] scale-[80%] gap-2 rounded-2xl border border-t-2 border-gray-600 border-t-primary bg-blue-950 px-2 py-2 md:left-[40%] md:mx-4 lg:scale-[100%]">
            <p className="flex justify-between text-primary">
              <span>Ends in</span>
              <span>Current bid</span>
            </p>
            <p className="flex justify-between font-bold text-white">
              <span>
                <CountDownComponent timeDifference={nftsData[0]!.endTime} />
              </span>
              <span suppressHydrationWarning={true}>
                {nftsData[0]?.price}ETH
              </span>
            </p>
            <Link href={`/items/${nftsData[0]!.id}`} className="grid">
              <motion.button
              whileHover={{scale: 1.01}}
              whileTap={{scale: 0.95}}
              className="mt-1 rounded-lg border border-primary py-2 font-bold text-primary transition-all duration-[.2s] ease-in hover:scale-[103%] hover:bg-primary hover:text-gray-800">
                Place A Bid
              </motion.button>
            </Link>
          </div>
          <div
            className={`${
              loaded ? "" : "hidden"
            } gradient absolute right-[43%] top-[30%] h-[50%] w-1/2 rotate-45 rounded-full shadow-3xl shadow-primary`}
          ></div>
          <Image
            suppressHydrationWarning={true}
            alt="Trending Image"
            className="relative z-10 mx-auto h-full w-full max-w-[500px] rounded-2xl object-cover object-top"
            src={nftsData[0]!.image}
            priority
            onLoad={setLoaded.bind(null, true)}
          />
        </div>
      </div>
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

export default Hero;
