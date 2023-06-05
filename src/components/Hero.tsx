import { FC } from "react";

const Hero = () => {

  return (
    <section className="py-6 md:grid md:grid-cols-2 mb-24">
      <div className=" mb-6 space-y-8 text-center text-white md:max-w-[70ch] md:text-start">
        <h1 className=" text-5xl ">
          Discover and Collect The Best NFTs{" "}
          <span className="text-primary">Digital Art.</span>
        </h1>
        <p>
          Get started with the easiest and most secure platform to buy and trade
          digital ART and NFT's. Start exploring the world of digital art and
          NFTs today and take control of your digital assets with confidence
        </p>
        <div className="flex justify-center gap-4 font-bold md:justify-start">
          <button className="rounded-lg bg-primary px-11 py-3 text-gray-800">
            Explore Now
          </button>
          <button>Learn More </button>
        </div>
        <CountingDiv className="hidden md:flex md:-ml-12" />
      </div>

      <div className="">
        <div className="relative mx-auto w-[80%] h-[400px] max-w-[350px]">
          <img
            className="h-full w-full rounded-2xl object-cover object-top"
            src="/nft-1.jpg"
          />
          <div className="absolute left-[40%] top-[85%] grid w-[220px] mx-4 gap-2 rounded-2xl border border-t-2 border-gray-600 border-t-primary bg-blue-950 px-2 py-2">
            <p className="flex justify-between text-primary">
              <span>Ends in</span>
              <span>Current bid</span>
            </p>
            <p className="flex justify-between font-bold text-white">
              <span>05:45:47</span>
              <span>0.24ETH</span>
            </p>
            <button className="mt-1 rounded-lg border border-primary py-2 font-bold text-primary">
              Place A Bid
            </button>
          </div>
        </div>
      </div>
      <CountingDiv className="mx-auto mt-24 flex md:hidden  " />
    </section>
  );
};

type Props = {
  className: string
}
function CountingDiv({ className }: Props) {
  return (
    <div className={`${className} justify-center text-white`}>
      <div className="flex flex-1 flex-col justify-between border-r border-r-primary text-center">
        <p className="text-3xl">
          <span className="text-primary">8.9</span>K
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
          <span className="text-3xl text-primary">8.9</span>K
        </p>
        <p>Collections</p>
      </div>
    </div>
  );
}

export default Hero;
