import Image from "next/image";
import { useNftsDataContext } from "~/contexts/NftsDataContext";
import { motion } from "framer-motion";

const Subscribe = () => {
  const nftsData = useNftsDataContext().nftsData;
  return (
    <section className="mb-24 mt-40 items-center gap-4 px-1 md:mt-44 md:grid md:grid-cols-2">
      <div className="fan-cards hidden md:grid">
        <div className="grid grid-cols-3">
          <Image
            className="five stack ml-32 w-48  rotate-[50deg] rounded-lg opacity-[80%] "
            src={nftsData[4]!.image}
            alt="Nft Image"
          />
          <Image
            className="one stack -ml-32  w-48 rotate-[-50deg] rounded-lg opacity-[80%]"
            src={nftsData[5]!.image}
            alt="Nft Image"
          />
          <Image
            className="four z-5 stack ml-20 w-48 rotate-[20deg] rounded-lg opacity-[60%]  "
            src={nftsData[6]!.image}
            alt="Nft Image"
          />
          <Image
            className="three stack z-10 w-48 rounded-lg opacity-[70%] "
            src={nftsData[7]!.image}
            alt="Nft Image"
          />
          <Image
            className="two z-5 stack -ml-20 w-48 rotate-[-20deg] rounded-lg opacity-[60%] "
            src={nftsData[8]!.image}
            alt="Nft Image"
          />
        </div>
      </div>
      <div className="main-form z-50 grid gap-4 text-center text-white md:text-start">
        <h2 className="mx-auto mb-2 max-w-[18ch] text-4xl font-bold md:m-0 md:text-5xl">
          Subscribe and <span className="text-primary">get our updates </span>{" "}
          every week
        </h2>
        <p className="mx-auto max-w-[50ch] md:m-0 md:max-w-[50ch] md:text-start">
          We have a blog related to NFT so we can share thoughts and routines on
          our blog which is updated weekly
        </p>
        <div className="mx-1 md:flex md:max-w-[50ch]  ">
          <input
            type="text"
            placeholder="Enter your e-mail"
            className="input-bordered input mb-6 w-full max-w-[50ch] bg-slate-700 text-white hover:border-2 hover:border-white focus:border-2 focus:border-primary md:rounded-r-none"
          />
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto block rounded-lg bg-primary px-11 py-3 font-bold text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:inline md:h-12  md:rounded-l-none md:px-4 md:py-2  "
          >
            Subscribe
          </motion.button>
        </div>
      </div>

      <div className="fan-cards-small mt-12">
        <div className="image1 perspective-origin-top-leftop relative flex justify-center text-5xl perspective-200 md:hidden">
          <Image
            className="one relative left-[70px] aspect-square w-[50%] rounded-xl object-cover object-top opacity-[60%] rotate-y-30 transform md:-ml-8 "
            src={nftsData[9]!.image}
            alt="Nft Image"
          />
          <Image
            className="two two relative  top-[50px]  z-10 aspect-square w-5/12 rounded-lg object-cover object-top opacity-[60%] transition-all duration-1000 ease-in-out transform"
            src={nftsData[10]!.image}
            alt="Nft Image"
          />
          <Image
            className="three relative left-[-70px]  aspect-square w-[50%] rounded-xl object-cover object-top opacity-[60%] -rotate-y-30 transform md:-ml-8 "
            src={nftsData[11]!.image}
            alt="Nft Image"
          />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
