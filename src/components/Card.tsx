import { NFT } from "~/utils/nfts";
import Link from "next/link";
import Image from "next/image";
import ethereumImage from "../../public/icons/ethereum.png";
import clockImage from "../../public/icons/clock.png";
import CountDownComponent from "./Countdown";
import { nanoid } from "nanoid";
import defaultImage from "../../public/nfts/default.svg";
import { useState, useEffect } from "react";
import {motion, AnimatePresence} from 'framer-motion'

export function Card({
  item,
  fromInput,
}: {
  item?: Partial<NFT>;
  fromInput?: boolean;
}) {
  const [isStaticImage, setStaticImage] = useState<boolean>(true);
  useEffect(() => {
    if (fromInput) setStaticImage(false);
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
  };

  const mergedItem = { ...defaultItem, ...item };
  if (mergedItem.image === undefined) mergedItem.image = defaultImage;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.5 }}
      suppressHydrationWarning={true}
      className="mx-auto mb-6 w-full max-w-[500px] space-y-2 rounded-lg border-t-2 border-t-primary bg-[#17233a] px-4 py-4"
    >
      {isStaticImage ? (
        <Image
          suppressHydrationWarning={true}
          alt={`${mergedItem.name} Image`}
          className="my-card-image mx-auto aspect-square rounded-lg object-cover object-top"
          src={mergedItem!.image}
        />
      ) : (
        <Image
          suppressHydrationWarning={true}
          alt={`${mergedItem.name} Image`}
          className="my-card-image mx-auto aspect-square rounded-lg object-cover object-top"
          src={mergedItem!.image}
          width={300}
          height={300}
        />
      )}
      <div
        suppressHydrationWarning={true}
        className="flex justify-between font-semibold tracking-wide"
      >
        <p suppressHydrationWarning={true}>{mergedItem!.name}</p>
        <p className="flex items-center gap-1">
          <span>
            <Image
              alt="Ethereum Icon"
              className="h-4 w-6"
              src={ethereumImage}
            />
          </span>
          <span suppressHydrationWarning={true}>{mergedItem!.price}ETH</span>
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
        <Link href={fromInput ? "" : `/items/${mergedItem.id}`}>
          <button className="rounded-lg border border-primary px-4 py-3 font-bold text-primary transition-all duration-[.2s] ease-in hover:scale-[103%] hover:bg-primary hover:text-gray-800 md:px-6">
            Place A Bid
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default Card;
