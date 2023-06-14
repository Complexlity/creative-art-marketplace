import { NFT } from "~/data/nfts";
import { getRandomNumber, pickRandomItems } from "~/utils/randoms";
import Image from "next/image";
import CountDownComponent from "../Universal/Countdown";
import { AiFillEye, AiFillHeart, AiFillPicture } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import Bids from "./Bids";
import { Modals } from "./Modals";
import { People, people } from "~/data/people";
import { getRandomStatus } from "./Bids";

export default function NftDetails({
  nftData,
  randomPeople,
}: {
  nftData: NFT | undefined;
  randomPeople: People[];
}) {
  const nftImage = pickRandomItems(people, 1)[0]?.image.src;

  if (!nftData)
    return <div>NFT wasn't found because typescript was shouting</div>;

  return (
    <section className="my-grid item-details mx-auto grid  max-w-[500px] gap-4 md:max-w-full md:grid-cols-2 md:gap-12">
      <div className="item-image aspect-square">
        <Image
          alt="NFT Image"
          className="h-full w-full rounded-xl object-cover object-top"
          src={nftData.image}
        />
      </div>
      <div className="item-descriptions mb-8 grid gap-4 md:-m-2">
        <small className="auction-time">
          {" "}
          <span className="text-gray-400">Auctions end in</span>{" "}
          <CountDownComponent timeDifference={nftData.endTime} />
        </small>

        <h1 className="item-name text-5xl md:text-6xl">{nftData.name}</h1>
        <p className="item-price text-3xl text-primary md:text-4xl">
          {" "}
          {nftData.price}ETH
        </p>

        <div className="interactions flex gap-4">
          <div className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 ease-in-out hover:-translate-y-1">
            <AiFillPicture /> {nftData.category}
          </div>
          <div className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 hover:-translate-y-1">
            <AiFillEye /> {getRandomNumber(1000)}
          </div>
          <div className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 hover:-translate-y-1">
            <AiFillHeart /> {getRandomNumber(100)}
          </div>
        </div>
        <p className="item-description text-gray-400"> {nftData.description}</p>

        <div className="creator grid gap-2">
          <h3>Creator</h3>
          <div className="flex items-center gap-4">
            <div className="creator-image relative h-12 w-12  rounded-full border-2 border-white ">
              <MdVerified className="absolute -bottom-1 -right-1 text-primary" />

              <Image
                width={500}
                height={500}
                className="h-full w-full rounded-full object-cover object-top "
                src={nftImage!}
                alt=""
              />
            </div>
            <p className="font-semibold tracking-widest">{nftData.creator}</p>
          </div>
        </div>
        <div className="mb-2 mt-4 flex gap-4 filter">
          <div
            tabIndex={0}
            className="cursor-pointer rounded-md border-2 border-gray-300 px-5 py-[.05rem] hover:border-white focus:outline-2  "
          >
            Bids
          </div>
          <div
            tabIndex={0}
            className="cursor-pointer rounded-md border-2 border-gray-500 px-5 py-[.05rem] text-gray-400 hover:border-white focus:outline-2"
          >
            History
          </div>
        </div>
        <div suppressHydrationWarning={true} className="bids mb-8 grid gap-2.5">
          {randomPeople.map((person, id) => {
            return <Bids key={id} person={person} status={getRandomStatus()} />;
          })}
        </div>
        <Modals nftData={nftData} />
      </div>
    </section>
  );
}
