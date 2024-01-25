import Image from "next/image";
import { AiFillEye, AiFillPicture } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { getRandomNumber } from "~/utils/randoms";
import CountDownComponent from "../Universal/Countdown";

import { QueryClient, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import useNftBids from "~/hooks/useNftBids";
import type { Like, Nft, ViewCount, WithUser } from "~/utils/types";
import HistoryBids from "./HistoryBids";
import LikeButton from "./LikeButton";
import Modals from "./Modals";
import { supabaseWithoutClient as supabase } from "~/supabase";
import { getViewsCount } from "~/utils/queries";
import MktIcon from "~/components/Universal/MktIcon";
import { getAuctionDateStatus } from "~/utils/libs";
import { useState } from "react";

export default function NftDetails({
  nftData,
  initialLikes,
  viewsCount,
}: {
  nftData: WithUser<Nft>;
  initialLikes: Like[];
  viewsCount: number;
}) {
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;

  const [started, setStarted] = useState(
    getAuctionDateStatus(nftData.start_date!, nftData.end_date!).started
  );
  const [ended, setEnded] = useState(false);

  const { data: bids, isLoading: isFetchingBids } = useNftBids({
    currentPathname,
  });

  const { data: viewsUpdate } = useQuery({
    queryKey: [`views-${nftData.slug}`],
    queryFn: async () => {
      let addedColumn: ViewCount[] | null;
      if (viewsCount === null) {
        const { data, error } = await supabase
          .from("nft_views")
          .insert({
            views_count: 1,
            nft_slug: nftData.slug,
          })
          .select();
        addedColumn = data;
      } else {
        const { data, error } = await supabase
          .from("nft_views")
          .update({
            views_count: viewsCount + 1,
          })
          .eq("nft_slug", nftData.slug)
          .select();
        addedColumn = data;
      }
      return addedColumn;
    },
    refetchOnWindowFocus: false,
  });

  const countDownDate = started ? nftData?.end_date : nftData?.start_date;

  const { data: views } = useQuery({
    queryFn: async () => {
      return await getViewsCount(nftData.slug);
    },
    initialData: viewsCount ?? 1,
  });

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
        {nftData?.sale_type === "TIMED_AUCTION" && (
          <small className="auction-time">
            {" "}
            <span className="text-gray-400">
              Auction {started ? "Ends" : "Starts"} in
            </span>{" "}
            <span className="text-3xl lg:text-4xl">
            <CountDownComponent
              date={countDownDate!}
              type={started ? "end" : "start"}
              setStarted={setStarted}
              setEnded={setEnded}
              />
            </span>

          </small>
        )}
        <h1 className="item-name text-5xl md:text-6xl">{nftData.name}</h1>
        <p className="item-price flex items-center text-3xl text-primary md:text-4xl">
          {" "}
          <MktIcon />
          {nftData.price}
        </p>

        <div className="interactions flex gap-4">
          <div className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 ease-in-out hover:-translate-y-1">
            <AiFillPicture /> {nftData.category}
          </div>
          <div className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 hover:-translate-y-1">
            <AiFillEye /> {views}
          </div>
          <LikeButton initialLikes={initialLikes} />
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
                src={nftData.users.imageUrl ?? ""}
                alt=""
              />
            </div>
            <p className="font-semibold tracking-widest">
              {nftData.users.username}
            </p>
          </div>
        </div>
        {isFetchingBids ? "Fetching bids...." : <HistoryBids bids={bids} />}
        <Modals nftData={nftData} />
      </div>
    </section>
  );
}
