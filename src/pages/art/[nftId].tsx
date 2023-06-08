import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import { Card } from "~/components/UniqueArt";
import nftImage from "../../../public/nft-1.jpg";

import { MdVerified } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdPending, MdCancel } from "react-icons/md";
import { AiFillEye, AiFillHeart, AiFillPicture } from "react-icons/ai";
import type { IconType } from "react-icons";

import { nftsData, NFT, generateNFTPrice } from  "../../utils/nfts"
import { people } from "~/utils/people";
import { People } from "~/utils/people";

function pickRandomItems<T>(arr: T[]) {
  const result = [];
  const arrCopy = [...arr]; // make a copy of the original array to avoid modifying it

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy[randomIndex]); // add the randomly selected item to the result array
    arrCopy.splice(randomIndex, 1); // remove the selected item from the copy of the array
  }

  return result;
}


export const getStaticProps: GetStaticProps = async (context) => {
  const itemID = context.params?.nftId;
  const peoplePicked = pickRandomItems(people)
  const foundItem = nftsData.find((item: NFT) => itemID === item.id);
  if (!foundItem) {
    return {
      props: { hasError: true },
    };
  }

  return {
    props: {
      nftData: foundItem,
      randomPeople: peoplePicked
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = nftsData;
  const pathsWithParams = data.map((item: NFT) => ({
    params: { nftId: item.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
};

function NFTItem(props: { nftData: NFT; hasError: boolean; randomPeople: People[] }) {
  const router = useRouter();
if (props.hasError) {
    return <h1>Error - please try another parameter</h1>;
  }
  return (
    <div className="main space-y-12 px-6 text-white">
      <NavBar />
      <ItemDetails nftData={props.nftData} randomPeople={props.randomPeople} />
      <RelatedItems />
      <Footer />
    </div>
  );
}

type BidStatus = "PENDING" | "ACCEPTED" | "REJECTED";
function getStatus(status: BidStatus) {
  let checkColor: string, statusText: string, StatusIcon: IconType;
  switch (status) {
    case "REJECTED":
      checkColor = "text-red-500";
      statusText = "Bid rejected";
      StatusIcon = MdCancel;
      break;
    case "PENDING":
      checkColor = "text-amber-300";
      statusText = "Pending bid";
      StatusIcon = MdPending;
      break;
    case "ACCEPTED":
      checkColor = "text-green-500";
      statusText = "Bid accepted";
      StatusIcon = IoMdCheckmarkCircle;
      break;
  }
  return { checkColor, statusText, StatusIcon };
}

function Bids({ status, person }: { status?: BidStatus, person: People }) {

  function generateRandomDate() {
  const now = new Date().getTime(); // get the timestamp of the current date and time
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000; // subtract the number of milliseconds in 7 days to get the timestamp of 7 days ago
  const randomTimestamp =
    Math.floor(Math.random() * (now - sevenDaysAgo)) + sevenDaysAgo; // generate a random timestamp between now and 7 days ago
  const randomDate = new Date(randomTimestamp); // create a new Date object from the random timestamp

  const month = String(randomDate.getMonth() + 1).padStart(2, "0"); // get the month and pad it with a leading zero if necessary
  const day = String(randomDate.getDate()).padStart(2, "0"); // get the day and pad it with a leading zero if necessary
  const year = randomDate.getFullYear(); // get the year
  const hours = randomDate.getHours() % 12 || 12; // get the hours in 12-hour format
  const minutes = String(randomDate.getMinutes()).padStart(2, "0"); // get the minutes and pad it with a leading zero if necessary
  const ampm = randomDate.getHours() < 12 ? "AM" : "PM"; // get the AM/PM indicator

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}


  if (!status) status = "ACCEPTED";
  const { checkColor, statusText, StatusIcon } = getStatus(status);
  return (
    <div className="flex gap-4">
      <div className="bidder-image relative h-12  w-12 rounded-full border-2 border-white">
        <StatusIcon className={`absolute -bottom-1 -right-1 ${checkColor}`} />
        <Image
          className="h-full w-full rounded-full object-cover object-top"
          src={person.image}
          alt=""
        />
      </div>
      <div className="grid content-center text-sm text-gray-400">
        <p>
          {statusText}
          {": "}
          <span className="font-bold tracking-wider text-white">
            {generateNFTPrice()}ETH
          </span>
        </p>
        {status === "PENDING" ? null : (
          <p>
            by{" "}
            <span className="font-bold tracking-wider text-white">
              {person.name}
            </span>{" "}
            at {generateRandomDate()}
          </p>
        )}
      </div>
    </div>
  );
}

function ItemDetails({ nftData, randomPeople }: { nftData: NFT, randomPeople: People[] }) {
  console.log({data: nftData})
  function getRandomNumber(n: number) {
  let number = Math.floor(Math.random() * (n + 1))
  return number.toString()
}


  return (
    <section className="my-grid item-details mx-auto grid  max-w-[500px] gap-4 md:max-w-full md:grid-cols-2 md:gap-12">
      <div className="item-image aspect-square">
        <Image
          alt="NFT Image"
          className="h-full w-full object-cover object-top"
          src={nftData.image}
        />
      </div>
      <div className="item-descriptions mb-8 grid gap-4 md:-m-2">
        <small className="auction-time">
          {" "}
          <span className="text-gray-400">Auctions end in</span>{" "}
          {nftData.endTime}{" "}
        </small>

        <h1 className="item-name text-5xl md:text-6xl">{nftData.name}</h1>
        <p className="item-price text-3xl text-primary md:text-4xl">
          {" "}
          {nftData.price}ETH
        </p>

        <div className="interactions flex gap-4">
          <div
            suppressHydrationWarning={true}
            className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 ease-in-out hover:-translate-y-1"
          >
            <AiFillPicture /> {nftData.category}
          </div>
          <div
            suppressHydrationWarning={true}
            className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700 duration-300 hover:-translate-y-1"
          >
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
                className="h-full w-full rounded-full object-cover object-top "
                src={nftImage}
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
        <div className="bids mb-8 grid gap-2.5">
          <Bids person={randomPeople[0]!} />
          <Bids person={randomPeople[1]!} status={"REJECTED"} />
          <Bids person={randomPeople[2]!} status={"PENDING"} />
          <Bids person={randomPeople[3]!} />
        </div>
        <div className="purchase-options flex gap-4">
          <button className="rounded-full bg-primary px-6 py-2 font-bold text-gray-800 hover:shadow-round hover:shadow-gray-400">
            Buy Now
          </button>
          <button className="rounded-full bg-gray-500 px-6 py-2 hover:shadow-round hover:shadow-primary">
            Place a bid
          </button>
        </div>
      </div>
    </section>
  );
}

function RelatedItems() {
  return (
    <section className="related-items grid gap-12 text-center">
      <h2 className="relative  text-3xl tracking-wide md:text-4xl">
        Related Items
        <span className="absolute bottom-[-.1rem] right-[50%] h-[.2rem] w-[20%] max-w-[180px] translate-x-[50%] bg-primary"></span>
      </h2>
      <div className="related-cards grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* <Card />
        <Card />
        <Card />
        <Card /> */}
      </div>
    </section>
  );
}
export default NFTItem;
