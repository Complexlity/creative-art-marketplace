import Image from "next/image";
import { AiFillEye, AiFillHeart, AiFillPicture } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { getRandomNumber } from "~/utils/randoms";
import CountDownComponent from "../Universal/Countdown";

import { usePathname } from "next/navigation";
import useNftBids from "~/hooks/useNftBids";
import type { Nft, WithUser } from "~/utils/types";
import HistoryBids from "./HistoryBids";
import Modals from "./Modals";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { supabaseWithoutClient as supabase, supabaseWithClient as supabaseClient } from "supabase";
import { useMemo } from "react";

export default function NftDetails({
  nftData,

}: {
  nftData: WithUser<Nft> | undefined;

}) {

  const pathname = usePathname()
  const { userId, getToken } = useAuth()
  // const supabase = useSupabase()
  const queryClient = new QueryClient()

const currentPathname = pathname.split('/').pop()!
  const { data: bids, isLoading: isFetchingBids } = useNftBids({currentPathname})

  if (!nftData)
    return <div>Not Found</div>;

  const { data: likes } = useQuery({
    queryKey: ['likes', nftData.slug],
    queryFn: async () => {
      const { data: likes, error } = await supabase.from('nft_likes').select('*').eq('nft_slug', nftData.slug)
      return likes
    }
  })

  console.log(likes)
  const likedByMe = !!likes?.find(obj => obj.user_id === userId)

  const { mutate: likePost } = useMutation({
    mutationKey: ['like-post'],
    mutationFn: async () => {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      const { data, error } = await supabase.from('nft_likes').insert({
        user_id: userId,
        nft_slug: nftData.slug
      }).select()
      if(error) console.log(error)
      return data
    },
    onSuccess: (data) => {
      console.log("I was a success")
      console.log(data)
      queryClient.invalidateQueries(['likes', nftData.slug])
    }
  })


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
          {/* @ts-ignore time function not created yet */}
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
          <div
            // @ts-ignore cannot pass handler for ts reasons
            onClick={likePost}
            className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 hover:-translate-y-1 hover:cursor-pointer"
          >
            <AiFillHeart fill={likedByMe ? `#be123c` : ""} /> {likes?.length}
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

