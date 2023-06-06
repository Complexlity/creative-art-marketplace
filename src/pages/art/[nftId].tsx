import {useRouter} from 'next/router'
import NavBar from '../../components/NavBar'
import {MdVerified} from 'react-icons/md'
import { IoMdCheckmarkCircle} from 'react-icons/io'
import { MdPending, MdCancel } from "react-icons/md";
import { IconType } from 'react-icons';
import { Card } from '~/components/UniqueArt';
function NFTItem() {
  const router = useRouter()
  const id = router.query.nftId
  return (
    <div className="main text-white px-6 space-y-12">
      <NavBar />
      <section className="item-details max-w-500px  mx-auto grid w-4/5 space-y-6 md:grid-cols-2">
        <div className="item-image aspect-square">
          <img
            className="h-full w-full object-cover object-top"
            src="/nft-1.jpg"
          />
        </div>
        <div className="item-descriptions space-y-4">
          <small className="auction-time"> Auctions end in 0h 0m 0s </small>
          <h2 className="item-name">Red Ocean </h2>
          <div className="interactions flex gap-4">
            <div>Art</div>
            <div>Seen</div>
            <div>Likes</div>
          </div>
          <p className="item-description">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta
            assumenda eveniet veniam rem eius, quibusdam nihil modi vel ipsum
            maiores cum illum laboriosam repellat expedita voluptas ipsam
            officiis voluptatum, ex itaque? Animi commodi ex praesentium,
            voluptatem in velit blanditiis.
          </p>

          <div className="creator">
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
              <p>John Smith</p>
            </div>
          </div>
          <div className="flex gap-4 filter ">
            <div>Bids</div>
            <div>History</div>
          </div>
          <div className="bids grid gap-4 py-4">
            <Bids />
            <Bids status={"REJECTED"} />
            <Bids status={"PENDING"} />
            <Bids />
          </div>
          <div className="purchase-options flex gap-4">
            <button className="rounded-full bg-primary px-6 py-2 font-bold text-gray-800 hover:bg-amber-300 ">
              Buy Now
            </button>
            <button className="rounded-full bg-gray-500 px-6 py-2 hover:bg-green-500">
              Place a bid
            </button>
          </div>
        </div>
      </section>
      <section className="related-items text-center space-y-6 mt-8">
        <h2 className="text-3xl md:text-4xl tracking-wide">Related Items</h2>
          <Card />
          <Card />
          <Card />
          <Card />
      </section>
    </div>
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

export default NFTItem