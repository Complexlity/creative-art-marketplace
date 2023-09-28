import Image from "next/image";
import { AiFillEye, AiFillHeart, AiFillPicture } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { NFT } from "~/data/nfts";
import { getRandomNumber } from "~/utils/randoms";
import CountDownComponent from "../Universal/Countdown";

import useCurrentUser from "~/hooks/useCurrentUser";
import { Modals } from "./Modals";
import { useQuery } from "@tanstack/react-query";
import { getBids } from "~/utils/queries";
import HistoryBids from "./HistoryBids";
import { usePathname } from "next/navigation";
import useNftBids from "~/hooks/useNftBids";
import { Nft } from "~/utils/types";


export default function NftDetails({
  nftData,

}: {
  nftData: Nft | undefined;

}) {

  const pathname = usePathname()
const currentPathname = pathname.split('/').pop()!
  const { data: bids, isLoading: isFetchingBids } = useNftBids({currentPathname})

  if (!nftData)
    return <div>Not Found</div>;
  const { data: creatorDetails } = useCurrentUser({ userId:nftData.user_id })



  return (
    <section className="my-grid item-details mx-auto grid  max-w-[500px] gap-4 md:max-w-full md:grid-cols-2 md:gap-12">
      <div className="item-image aspect-square">
        <Image
          alt="NFT Image"
          className="h-full w-full rounded-xl object-cover object-top"
          src={nftData.image}
          width={500}
          height={500}
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
                src={creatorDetails?.imageUrl ?? ""}
                alt=""
              />
            </div>
            <p className="font-semibold tracking-widest">{creatorDetails?.username}</p>
          </div>
        </div>
        {isFetchingBids
          ? "Fetching bids...."
          : <HistoryBids bids={bids} />}
        <Modals nftData={nftData} />
      </div>
    </section>
  );
}

