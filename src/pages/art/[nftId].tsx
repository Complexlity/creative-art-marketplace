import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import { Card } from "~/components/Card";
import { MdVerified } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdPending, MdCancel } from "react-icons/md";
import { AiFillEye, AiFillHeart, AiFillPicture } from "react-icons/ai";
import type { IconType } from "react-icons";

import { NFT } from "../../utils/nfts";
import { people } from "~/utils/people";
import { People } from "~/utils/people";
import { useNftsDataContext, generateNFTPrice } from "~/utils/DataContext";
import { Modal, Button, Label, Checkbox, TextInput } from "flowbite-react";
import CountDownComponent from "~/components/Countdown";


function pickRandomItems<T>(arr: T[], numOfItems: number) {
  const result = [];
  const arrCopy = [...arr]; // make a copy of the original array to avoid modifying it

  for (let i = 0; i < numOfItems; i++) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy[randomIndex]); // add the randomly selected item to the result array
    arrCopy.splice(randomIndex, 1); // remove the selected item from the copy of the array
  }

  return result;
}

function NFTItem() {
  const router = useRouter();
  const nftsData = useNftsDataContext().nftsData;
  const id = router.query.nftId;
  const randomPeople = pickRandomItems(people, 4) as People[];
  const nftData = nftsData.find((item) => id === item.id) as NFT;
  let relatedItems = nftsData.filter((item) => id !== item.id);
  relatedItems = pickRandomItems(relatedItems, 6) as NFT[];

  return (
    <div className="main space-y-12 px-6 text-white">
      <NavBar />

      <ItemDetails nftData={nftData} randomPeople={randomPeople} />
      <RelatedItems relatedItems={relatedItems} />
      <Footer />
    </div>
  );
}

type BidStatus = "PENDING" | "ACCEPTED" | "REJECTED";
function getStatusText(status: BidStatus) {
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

function getRandomStatus(): BidStatus | undefined {
  let statuses: BidStatus[] = ["ACCEPTED", "PENDING", "REJECTED"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function Bids({ status, person }: { status?: BidStatus; person: People }) {
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
  const { checkColor, statusText, StatusIcon } = getStatusText(status);
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
        <p>
          by{" "}
          <span className="font-bold tracking-wider text-white">
            {person.name}
          </span>{" "}
          at {generateRandomDate()}
        </p>
      </div>
    </div>
  );
}

function ItemDetails({
  nftData,
  randomPeople,
}: {
  nftData: NFT | undefined;
  randomPeople: People[];
  }) {
  const nftImage = pickRandomItems(people, 1)[0]?.image.src

  if (!nftData)
    return <div>NFT wasn't found because typescript was shouting</div>;

  function getRandomNumber(n: number) {
    let number = Math.floor(Math.random() * (n + 1));
    return number.toString();
  }

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
          <CountDownComponent timeDifference={nftData.endTime}/>
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

function RelatedItems({ relatedItems }: { relatedItems: NFT[] }) {
  return (
    <section className="related-items grid gap-12 text-center">
      <h2 className="relative  text-3xl tracking-wide md:text-4xl">
        Related Items
        <span className="absolute bottom-[-.1rem] right-[50%] h-[.2rem] w-[20%] max-w-[180px] translate-x-[50%] bg-primary"></span>
      </h2>
      <div suppressHydrationWarning={true} className="related-cards grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {relatedItems.map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}

type BuyOptions = "BUY_NOW" | "PLACE_BID"
function Modals({nftData}: {nftData: NFT}) {
  const [openModal, setOpenModal] = useState<BuyOptions | undefined>();
  const props = { openModal, setOpenModal };
  return (
    <>
      <div className="purchase-options flex gap-4">
        <button
          onClick={() => setOpenModal("BUY_NOW")}
          className="rounded-full bg-primary px-6 py-2 font-bold text-gray-800 hover:shadow-round hover:shadow-gray-400"
        >
          Buy Now
        </button>
        <button
          onClick={() => props.setOpenModal("PLACE_BID")}
          className="rounded-full bg-gray-500 px-6 py-2 hover:shadow-round hover:shadow-primary"
        >
          Place a bid
        </button>
      </div>
      <Modal
        dismissible
        className="backdrop-blur"
        show={openModal === "BUY_NOW"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>{nftData.name}</Modal.Header>
        <Modal.Body className="">
          <div className="space-y-6 ">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {nftData.description}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to purchase this item for {nftData.price}
              ETH?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>
            I accept
          </Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
      dismissible
        show={openModal === "PLACE_BID"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white font-ttramillas">
              {nftData.name}
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="current_price" value="Current Price" />
              </div>
              <TextInput disabled id="current_price" placeholder="" required value={nftData.price} helperText={<>NOTE: Prices can fluctuate depending on the market </>} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="your_bid" value="Enter your bid amount" />
              </div>
              <TextInput id="your_bid" type="number" required />
            </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">I understand the terms of bidding on this platform</Label>
            </div>
            <div className="w-full">
              <Button>Submit</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default NFTItem;
