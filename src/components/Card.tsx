import {NFT} from "~/utils/nfts"
import Link from "next/link";
import Image from "next/image"
import ethereumImage from "../../public/icons/ethereum.png";
import clockImage from "../../public/icons/clock.png";
import CountDownComponent from "./Countdown";
import { nanoid } from "nanoid";
import defaultImage from '../../public/nfts/default.svg'
import { useState, useEffect } from 'react'


export function Card({ item }: { item?: Partial<NFT> }) {
  const [isStaticImage, setStatic] = useState<boolean>(false)
  useEffect(() => {
    if (item!.image) setStatic(true)
  }, [])
  const  defaultItem = {
      id: nanoid(5),
      name: "",
      price: 0,
      image: defaultImage,
      category: "",
      description: "",
      endTime: 0,
      creator: ""
    }

  const mergedItem = { ...defaultItem, ...item }
  if(mergedItem.image === undefined) mergedItem.image = defaultImage

  return (
    <div
      suppressHydrationWarning={true}
      className=" mb-6 max-w-full space-y-2 rounded-lg border-t-2 border-t-primary bg-[#17233a] px-4 py-4"
    >
      {isStaticImage ?
        <Image
          suppressHydrationWarning={true}
        alt={`${mergedItem.name} Image`}
        className="my-card-image mx-auto aspect-square rounded-lg object-cover object-top"
          src={mergedItem!.image}
      /> :
        <Image
          suppressHydrationWarning={true}
          alt={`${mergedItem.name} Image`}
          className="my-card-image mx-auto aspect-square rounded-lg object-cover object-top"
          src={mergedItem!.image}
          width={300}
          height={300}
        />
      }
      <div className="flex justify-between font-semibold tracking-wide">
        <p>{mergedItem!.name}</p>
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
        <Link href={`/art/${mergedItem.id}`}>
          <button className="rounded-lg border border-primary px-4 py-3 font-bold text-primary transition-all duration-[.2s] ease-in hover:scale-[103%] hover:bg-primary hover:text-gray-800 md:px-6">
            Place A Bid
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card