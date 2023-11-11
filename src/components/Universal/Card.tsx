
import Link from "next/link";
import Image from "next/image";
import ethereumImage from "/public/icons/ethereum.png";
import clockImage from "/public/icons/clock.png";
import CountDownComponent from "./Countdown";
import { nanoid } from "nanoid";
import defaultImage from "/public/nfts/default.svg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nft } from "~/utils/types";
import type { NFT } from "~/data/nfts";
import MktIcon from "./MktIcon";
export function Card({
  item,
  fromInput,
}: {
  item?: Nft | NFT;
  fromInput?: boolean;
}) {
  const [isStaticImage, setStaticImage] = useState<boolean>(false);
  useEffect(() => {
    if (!fromInput) setStaticImage(false);
  }, []);
  const defaultItem = {
    id: nanoid(5),
    name: "",
    price: 0,
    image: defaultImage,
    category: "",
    description: "",
    endTime: 0,
    creator: "",
    slug: ''
  };

  const mergedItem = { ...defaultItem, ...item };
  if (mergedItem.image === undefined) mergedItem.image = defaultImage;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: "-100%", transition: { duration: 0.4 } }}
      transition={{ duration: 0.5 }}
      suppressHydrationWarning={true}
      className="mx-auto mb-6 w-full max-w-[500px] space-y-2 rounded-lg border-t-2 border-t-primary bg-[#17233a] px-4 py-4"
    >
      {/* {isStaticImage ? (
        <Image
          suppressHydrationWarning={true}
          alt={`${mergedItem.name} Image`}
          className="my-card-image mx-auto aspect-square rounded-lg object-cover object-top"
          src={mergedItem!.image}
        />
      ) : ( */}
      <Image
        suppressHydrationWarning={true}
        alt={`${mergedItem.name} Image`}
        className="my-card-image mx-auto aspect-square w-full rounded-lg object-cover object-top"
        src={mergedItem!.image}
        width={300}
        height={300}
      />
      {/* )} */}
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
      <div className="flex justify-between">
        <div className="grid text-start ">
          <small className="text-gray-400">Ending In</small>
          <p className="flex items-center gap-1">
            <Image alt="Clock Icon" className="h-4 w-4" src={clockImage} />{" "}
            <span className="font-bold">
              <CountDownComponent timeDifference={mergedItem!.endTime} />
            </span>
          </p>
        </div>
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
