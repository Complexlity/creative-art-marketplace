import Link from "next/link";
import Image from "next/image";
import clockImage from "/public/icons/clock.png";
import CountDownComponent from "./Countdown";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nft } from "~/utils/types";
import MktIcon from "./MktIcon";
export function Card({ item }: { item?: Nft }) {
  const defaultItem = {
    id: nanoid(5),
    name: "Lorem Ipsum",
    price: 0,
    image: "/nfts/default.png",
    category: "",
    description: "",
    slug: "",
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
      className="mx-auto mb-6 w-full max-w-[500px] space-y-2 rounded-lg border-t-2 border-t-primary bg-[#17233a] px-4 py-4"
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
