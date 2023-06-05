import { FC } from "react";

const Hero = () => {

  return (
    <section className="mb-24 py-6 md:grid md:grid-cols-2">
      <div className=" mb-6 space-y-8 text-center text-white md:max-w-[70ch] md:text-start">
        <h1 className=" text-6xl ">
          Discover and Collect The Best NFTs{" "}
          <span className="text-primary">Digital Art.</span>
        </h1>
        <p>
          Get started with the easiest and most secure platform to buy and trade
          digital ART and NFT's. Start exploring the world of digital art and
          NFTs today and take control of your digital assets with confidence
        </p>
        <div className="flex justify-center gap-4 font-bold md:justify-start">
          <button className=" rounded-lg bg-primary px-11 py-3 text-gray-800 hover:text-primary hover:outline-2 hover:outline-primary hover:bg-blue-950 hover:outline-dotted">
            Explore Now
          </button>
          <button className=""><span className="hover:border-b-4 py-1 hover:border-primary text-xl">Learn More</span></button>
        </div>
        <CountingDiv className="hidden md:-ml-12 md:flex" />
      </div>

      <div className="">
        <div className="relative mx-auto h-[400px] w-[80%] max-w-[350px]">
          <div className="absolute left-[40%] top-[85%] z-20 mx-4 grid w-[220px] gap-2 rounded-2xl border border-t-2 border-gray-600 border-t-primary bg-blue-950 px-2 py-2">
            <p className="flex justify-between text-primary">
              <span>Ends in</span>
              <span>Current bid</span>
            </p>
            <p className="flex justify-between font-bold text-white">
              <span>05:45:47</span>
              <span>0.24ETH</span>
            </p>
            <button className="mt-1 rounded-lg border border-primary py-2 font-bold text-primary hover:bg-primary hover:text-gray-800 hover:scale-[103%] transition-all duration-[.2s] ease-in">
              Place A Bid
            </button>
          </div>
          <div className="gradient z[-10] absolute right-[43%] top-[30%] h-[50%] w-1/2 rotate-45 rounded-full shadow-3xl shadow-primary"></div>
          <img
            className="relative z-10 h-full w-full rounded-2xl object-cover object-top"
            src="/nft-1.jpg"
          />
        </div>
      </div>
      <CountingDiv className="mx-auto mt-32 flex md:hidden  " />
    </section>
  );
};

type Props = {
  className: string
}
function CountingDiv({ className }: Props) {
  return (
    <div className={`justify-center text-white ${className}`}>
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
