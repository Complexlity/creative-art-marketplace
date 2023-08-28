import { People } from "~/data/people";
import Image from "next/image";
import { generateRandomDate, generateRandomNFTPrice, pickFromArray } from "~/utils/randoms";
import { IconType } from "react-icons";
import { MdCancel, MdPending } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";


type BidStatus = "PENDING" | "ACCEPTED" | "REJECTED";
let statuses: BidStatus[] = ["ACCEPTED", "PENDING", "REJECTED"];

export function getRandomStatus() {
  return pickFromArray(statuses)
}

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

export default function Bids({
  status,
  person,
  type
}: {
  status?: BidStatus;
  person: People;
  type: "bids" | "history"
}) {
  if(type === 'history'){
    if(status == "PENDING" || !status) status = "ACCEPTED"
  }

  if(type == 'bids') status = "PENDING"



  const { checkColor, statusText, StatusIcon } = getStatusText(status!);
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
          at {generateRandomDate().formatted}
        </p>
      </div>
    </div>
  );
}
