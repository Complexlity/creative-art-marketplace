import {useRouter} from 'next/router'
import NavBar from '../../components/NavBar'
import {MdVerified} from 'react-icons/md'
import { IoMdCheckmarkCircle} from 'react-icons/io'
import { MdPending, MdCancel } from "react-icons/md";
import { AiFillEye, AiFillHeart, AiFillPicture } from "react-icons/ai";
import { IconType } from 'react-icons';
import { Card } from '~/components/UniqueArt';
function NFTItem() {
  const router = useRouter()
  const id = router.query.nftId
  return (
    <main className="main space-y-12 px-6 text-white">
      <NavBar />
      <ItemDetails/>
      <RelatedItems />
    </main>
  );
}

type BidStatus = "PENDING" | "ACCEPTED" | "REJECTED"
function getStatus(status: BidStatus) {
    let checkColor: string, statusText: string, StatusIcon: IconType
    switch (status) {
      case "REJECTED":
        checkColor = "text-red-500";
        statusText = "Bid rejected";
        StatusIcon = MdCancel
        break;
      case "PENDING":
        checkColor = "text-amber-300";
        statusText = "Pending bid";
        StatusIcon = MdPending
        break;
      case "ACCEPTED":
        checkColor = "text-green-500";
        statusText = "Bid accepted";
        StatusIcon = IoMdCheckmarkCircle
        break;
    }
    return {checkColor, statusText, StatusIcon}
  }

function Bids({ status }: { status?: BidStatus }) {
  if(!status) status = "ACCEPTED"
  const { checkColor, statusText, StatusIcon } = getStatus(status)
  return (
    <div className="flex gap-4">
      <div className="bidder-image relative h-12  w-12 rounded-full border-2 border-white">
        <StatusIcon className={`absolute -bottom-1 -right-1 ${checkColor}`} />
        <img
          className="h-full w-full rounded-full object-cover object-top"
          src="/nft-1.jpg"
          alt=""
        />
      </div>
      <div className="grid content-center text-sm text-gray-400">
        <p>
          {statusText}{": "}
          <span className="font-bold tracking-wider text-white">
            0.0025 ETH
          </span>
        </p>
        {status === "PENDING"
          ? null
          : <p>
          by{" "}
          <span className="font-bold tracking-wider text-white">
            John Smith
          </span>{" "}
          at 10/06/2023 4:54 AM
        </p>}
      </div>
    </div>
  );
}

function ItemDetails() {
  return (
    <section className="my-grid item-details max-w-[500px] md:max-w-full  mx-auto grid md:grid-cols-2 gap-12">
        <div className="item-image aspect-square">
          <img
            className="h-full w-full object-cover object-top"
            src="/nft-1.jpg"
          />
        </div>
        <div className="item-descriptions space-y-6 md:-m-2">
          <small className="auction-time">
            {" "}
            <span className="text-gray-400">Auctions end in</span> 0h 0m 0s{" "}
          </small>
          <h1 className="item-name text-5xl md:text-6xl">Red Ocean </h1>
          <div className="interactions flex gap-4">
            <div className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-,d shadow-gray-700">
              <AiFillPicture /> Art
            </div>
            <div className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700">
              <AiFillEye /> 250
            </div>
            <div className="flex items-center gap-1 rounded-sm bg-slate-500 px-4 py-[.1rem] text-gray-300 shadow-md shadow-gray-700">
              <AiFillHeart /> 18
            </div>
          </div>
          <p className="item-description text-gray-400">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta
            assumenda eveniet veniam rem eius, quibusdam nihil modi vel ipsum
            maiores cum illum laboriosam repellat expedita voluptas ipsam
            officiis voluptatum, ex itaque? Animi commodi ex praesentium,
            voluptatem in velit blanditiis.
          </p>

          <div className="creator grid gap-2">
            <h3>Creator</h3>
            <div className="flex items-center gap-4">
              <div className="creator-image relative h-12 w-12  rounded-full border-2 border-white ">
                <MdVerified className="absolute -bottom-1 -right-1 text-primary" />

                <img
                  className="h-full w-full rounded-full object-cover object-top "
                  src="/nft-1.jpg"
                  alt=""
                />
              </div>
              <p className="font-semibold tracking-widest">John Smith</p>
            </div>
          </div>
          <div className="flex gap-4 filter ">
            <div
              tabIndex={0}
              className="rounded-md border-2 border-gray-300 px-5 py-[.05rem] focus:outline-2  "
            >
              Bids
            </div>
            <div
              tabIndex={0}
              className="rounded-md border-2 border-gray-500 px-5 py-[.05rem] text-gray-400 focus:outline-2"
            >
              History
            </div>
          </div>
          <div className="bids grid gap-4 pb-4">
            <Bids />
            <Bids status={"REJECTED"} />
            <Bids status={"PENDING"} />
            <Bids />
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
  )
}

function RelatedItems() {
  return (
    <section className="related-items space-y-6 text-center">
      <h2 className="text-3xl tracking-wide md:text-4xl ">Related Items</h2>
      <div className="related-cards grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}
export default NFTItem