import Image from "next/image";
import nftImage from '../../public/nft-1.jpg'

const Subscribe = () => {
  return (
    <section className="mb-24 items-center gap-4 md:grid md:grid-cols-2">
      <div className="hidden md:grid">
        <div className="grid grid-cols-3">
          <Image
            className="five stack ml-32 w-48  rotate-[50deg] rounded-lg opacity-[60%] "
            src={nftImage}
            alt="Nft Image"
          />
          <Image

            className="one stack -ml-32  w-48 rotate-[-50deg] rounded-lg opacity-[60%]"
            src={nftImage}
            alt="Nft Image"
          />
          <Image

            className="four z-5 stack ml-20 w-48 rotate-[20deg] rounded-lg opacity-[80%] "
            src={nftImage}
            alt="Nft Image"
          />
          <Image

            className="three stack z-10 w-48 rounded-lg"
            src={nftImage}
            alt="Nft Image"
          />
          <Image

            className="two z-5 stack -ml-20 w-48 rotate-[-20deg] rounded-lg opacity-[80%]"
            src={nftImage}
            alt="Nft Image"
          />
        </div>
      </div>
      <div className="z-50 space-y-6 text-center text-white md:text-start">
        <h2 className="mx-auto max-w-[32ch]  text-5xl font-bold md:m-0">
          Subscribe And <span className="text-primary">get our Updates </span>{" "}
          Every Week
        </h2>
        <p className="mx-auto max-w-[60ch] md:m-0 md:max-w-[50ch] md:text-start">
          We have a blog related to NFT so we can share thoughts and routines on
          our blog which is updated weekly
        </p>
        <div className="md:flex md:max-w-[70ch] ">
          <input
            type="text"
            placeholder="Enter your e-mail"
            className="input-bordered input mb-6 w-full max-w-xs md:max-w-[70ch] bg-slate-700 text-white focus:outline-primary md:rounded-r-none"
          />
          <button className="mx-auto block rounded-lg bg-primary px-11 py-3 font-bold text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary  md:inline md:h-12 md:rounded-l-none  ">
            Subscribe
          </button>
        </div>
      </div>

      <div className="">
        <div className="image1 relative flex justify-center text-5xl md:hidden">
          <Image

            className="relative left-[70px] aspect-square w-[50%] rotate-[-30deg] rounded-xl object-cover object-top opacity-[60%] md:-ml-8"
            src={nftImage}
            alt="Nft Image"
          />
          <Image

            className="relative top-[50px] z-10 aspect-square w-5/12 rounded-lg object-cover object-top opacity-[90%]"
            src={nftImage}
            alt="Nft Image"
          />
          <Image

            className="relative left-[-70px]  aspect-square w-[50%] rotate-[30deg] rounded-xl object-cover object-top opacity-[60%] md:-ml-8"
            src={nftImage}
            alt="Nft Image"
          />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
