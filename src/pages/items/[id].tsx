import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NavBar from "~/components/General/NavBar";
import Footer from "~/components/General/Footer";
import { Card } from "~/components/General/Card";
import { MdVerified } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdPending, MdCancel } from "react-icons/md";
import { AiFillEye, AiFillHeart, AiFillPicture } from "react-icons/ai";
import type { IconType } from "react-icons";
import {bidSchema} from "~/utils/schemas"

import { NFT } from "~/data/nfts";
import { people, People } from "~/data/people";

import { useNftsDataContext, } from "~/contexts/DataContext";
import { generateRandomNFTPrice, pickRandomItems} from '~/utils/utitlities'
import { Modal, Button, Label, Checkbox,  } from "flowbite-react";
import CountDownComponent from "~/components/General/Countdown";
import {useFormik} from 'formik'
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";






function NFTItem() {
  const router = useRouter();
  const nftsData = useNftsDataContext().nftsData;
  const id = router.query.id;
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
            {generateRandomNFTPrice()}ETH
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
function Modals({ nftData }: { nftData: NFT }) {
  const [openModal, setOpenModal] = useState<BuyOptions | undefined>();
  const props = { openModal, setOpenModal };


  const notify = () => toast("Thank you for shopping at creative arts 😁")

  return (
    <>
      <div className="purchase-options flex gap-4">
        <motion.button
          onClick={() => setOpenModal("BUY_NOW")}
          className="rounded-full bg-primary px-6 py-2 font-bold text-gray-800 hover:shadow-round hover:shadow-gray-400"
          whileHover={{scale: 1.05, }} whileTap={{scale: 0.98}}
        >
          Buy Now
        </motion.button>
        <motion.button
          onClick={() => props.setOpenModal("PLACE_BID")}
          className="rounded-full bg-gray-500 px-6 py-2 hover:shadow-round hover:shadow-primary"
          whileHover={{scale: 1.05, }} whileTap={{scale: 0.98}}
         >
          Place a bid
        </motion.button>
      </div>
      <Modal
        className="backdrop-blur"
        dismissible
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
          <Button
            onClick={() => {
              props.setOpenModal((state) => undefined);
              notify()
            }}
          >
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
          <BidInputForm nftData={nftData}  setOpenModal={setOpenModal} />
        </Modal.Body>
      </Modal>
      <ToastContainer
      position="top-center"
      autoClose={3000}
      closeOnClick
      theme="dark"
      />
    </>
  );
}

const BidInputForm = ({ nftData, setOpenModal}: {nftData: NFT, setOpenModal: Dispatch<SetStateAction<BuyOptions | undefined>>}) => {
  const [initialValues, setInitialValues] = useState({
    bid: undefined,
    termsAndConditions: false,
  })
  const { values, errors, touched, handleSubmit, handleBlur, handleChange} = useFormik({
  initialValues:{...initialValues},
    onSubmit: (values, { resetForm }) => {
      notifyBid()
      setInitialValues({...initialValues})
      setOpenModal(undefined)
    },
    validationSchema: bidSchema,
  })
const notifyBid = () => toast("Bid submit successful. We will get back to you shortly ☺")

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="font-ttramillas text-xl font-medium text-gray-900 dark:text-white">
        {nftData.name}
      </h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="current_price" value="Current Price(ETH)" />
        </div>
        <input
          disabled
          id="current_price"
          type="text"
          placeholder="Type here"
          className="input-bordered input-info input w-full"
          value={nftData.price}
        />
        <small>NOTE: Prices can fluctuate depending on the market</small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="your_bid" value="Enter your bid amount" />
        </div>
        <input
          className={`input-bordered input w-full focus:outline-none ${errors.bid && touched.bid ? "input-error" : touched.bid ? "input-success" : "input-info"}`}
          name="bid"
          type="number"
          required
          value={values.bid}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <small className="text-red-400">{errors.bid && touched.bid ? errors.bid : ""}</small>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" name="termsAndConditions" onChange={handleChange}  />
        <Label htmlFor="remember">
          I understand the terms of bidding on this platform
        </Label>

      </div>
      {errors.termsAndConditions && <small className="text-red-400">{errors.termsAndConditions}</small>}
      <div className="w-full">
        <Button type="submit">Submit</Button>
      </div>
    </form>

    </>
  );
}


export default NFTItem;
