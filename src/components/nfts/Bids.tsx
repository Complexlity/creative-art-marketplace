import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCancel, MdPending } from "react-icons/md";
import MktIcon from "~/components/Universal/MktIcon";
import useCurrentPage from "~/hooks/useCurrentPage";
import type { Nft, WithUser } from "~/utils/types";

type BidStatus = "rejected" | "pending" | "accepted";

function getStatusText(status: BidStatus) {
  let checkColor: string, statusText: string, StatusIcon: IconType;
  switch (status) {
    case "rejected":
      checkColor = "text-red-500";
      statusText = "Bid rejected";
      StatusIcon = MdCancel;
      break;
    case "pending":
      checkColor = "text-amber-300";
      statusText = "Pending bid";
      StatusIcon = MdPending;
      break;
    case "accepted":
      checkColor = "text-green-500";
      statusText = "Bid accepted";
      StatusIcon = IoMdCheckmarkCircle;
      break;
  }
  return { checkColor, statusText, StatusIcon };
}

export default function Bids({ bid }: { bid: any }) {
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop()!;
  const { data } = useCurrentPage({ slug: currentPathname });
  const nftData = data as unknown as WithUser<Nft>;
  const { checkColor, statusText, StatusIcon } = getStatusText(bid.status);

  return (
    <div className="flex gap-4">
      <div className="bidder-image relative aspect-square  h-12 w-12 rounded-full border-2 border-white">
        <StatusIcon className={`absolute -bottom-1 -right-1 ${checkColor}`} />
        <Image
          className="h-full w-full rounded-full object-cover object-top"
          width={300}
          height={300}
          src={bid.users.imageUrl}
          alt=""
        />
      </div>
      <div className="grid content-center text-sm text-gray-400">
        <p>
          {statusText}
          {": "}
          <span className="flex items-center font-bold tracking-wider text-white">
            <MktIcon />
            {bid.amount}
          </span>
        </p>
        <p>
          by{" "}
          <span className="font-bold tracking-wider text-white">
            {bid.status === "pending"
              ? bid.users.username
              : nftData.users.username}
          </span>{" "}
          at {bid.updated_at}
        </p>
      </div>
    </div>
  );
}
