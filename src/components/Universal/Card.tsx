import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { cn, getAuctionDateStatus } from "~/utils/libs";
import { Nft, WithUser } from "~/utils/types";
import CountDownComponent from "./Countdown";
import MktIcon from "./MktIcon";
import clockImage from "/public/icons/clock.png";
import { useEffect, useState } from "react";


export function Card({ item }: { item?: Nft }) {
  const [started, setStarted] = useState(getAuctionDateStatus(item?.start_date!, item?.end_date!).started)
  const [ended, setEnded] = useState(false)

  const countDownDate = started ? item?.end_date : item?.start_date

  useEffect(() => {
    if (ended) {

      //TODO: Transfer item ownership to the current highest bidder
    }
  }, [ended])

  const defaultItem = {
    name: "Lorem Ipsum",
    price: 0,
    image: "/default.png",
    category: "",
    description: "",
    slug: "",
    sale_type: "FIXED_PRICE",
  };

  const mergedItem = { ...defaultItem, ...item };

  // @ts-expect-error type item not defined
  Object.entries(item).forEach(([key, value]) => {
    //@ts-expect-error element has any type
    if (value === "" && defaultItem[key] !== undefined) {
      //@ts-expect-error element has any type
      mergedItem[key] = defaultItem[key];
    }
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: "-100%", transition: { duration: 0.4 } }}
      transition={{ duration: 0.5 }}
      suppressHydrationWarning={true}
      className={cn("mx-auto mb-6 w-full max-w-[500px] space-y-3 rounded-lg border-t-2 border-t-primary bg-[#17233a] px-4 py-4 border-b-[3px]", {
        "border-b-amber-700": mergedItem.sale_type === "FIXED_PRICE",
        "border-b-blue-700": mergedItem.sale_type === "OPEN_BIDS",
        "border-b-green-700": mergedItem.sale_type === "TIMED_AUCTION" &&  !started,
        "border-b-red-700": mergedItem.sale_type === "TIMED_AUCTION" &&  started,
      })}
    >
      <div>
        <Image
          suppressHydrationWarning={true}
          alt={`${mergedItem.name} Image`}
          className="my-card-image mx-auto aspect-square w-full rounded-lg object-cover object-top"
          src={mergedItem.image}
          width={300}
          height={300}
        />
      </div>

      <div
        suppressHydrationWarning={true}
        className="flex justify-between font-semibold tracking-wide"
      >
        <p suppressHydrationWarning={true}>{mergedItem!.name}</p>
        <p className="flex items-center gap-1">
          <span>
            <MktIcon />
          </span>
          <span suppressHydrationWarning={true}>{mergedItem!.price}</span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        {mergedItem.sale_type === "OPEN_BIDS" && <Badge className="bg-blue-700 dark:bg-blue-700">Open Bid</Badge>}
        {mergedItem.sale_type === "FIXED_PRICE" && <Badge className="bg-amber-700 dark:bg-amber-700">Fixed Price</Badge>}
        {mergedItem.sale_type === "TIMED_AUCTION" && (
          <div className="grid text-start ">
            <small className={cn("text-green-400 ", {"text-red-400": started})}>{started ? "Ending" : "Starting"} In </small>
            <p className="flex items-center gap-1">
              <Image alt="Clock Icon" className="h-4 w-4" src={clockImage} />{" "}
              <span className="font-bold">
                <CountDownComponent
                  date={countDownDate!}
                  setStarted={setStarted}
                  type={started ? "end" : "start"}
                  setEnded={setEnded}
                />
              </span>
            </p>
          </div>
        )}

        <Link href={mergedItem.slug ? `/nfts/${mergedItem.slug}` : ""}>
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "#d2f55e",
              color: "#1f2937",
            }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg border border-primary px-4 py-3 font-bold text-primary ease-in md:px-6"
          >
            Place A Bid
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}


export default Card;
