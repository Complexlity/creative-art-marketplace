import Image from "next/image";
import ethereumImage from "../../public/icons/ethereum.png";
import clockImage from "../../public/icons/clock.png";
import { nftsData, randomNumberGenerator, NFT } from "~/utils/nfts";

import { useState, useEffect } from "react";
import Link from "next/link";

const UniqueArt = () => {
  const [generator] = useState(randomNumberGenerator);
  let cards = [];
  for (let i = 0; i < 3; i++) {
    let generatedIdx = generator.next().value;
    if (!generatedIdx) generatedIdx = 0;
    const item = nftsData[generatedIdx] as NFT;
    cards.push(<Card key={item.id} item={item} />);
  }

  return (
    <section className="mb-24 text-white">
      <div className="mb-6">
        <h2 className="text-center text-4xl md:text-start md:text-5xl">
          <span className="text-primary">Amazing</span> and Super{" "}
        </h2>
        <div className="text-center md:flex md:justify-between">
          <h2 className="text-4xl md:text-5xl">
            Unique Art of This <span className="text-primary">Week</span>
          </h2>
          <button className="hidden rounded-md bg-primary px-8 py-2 font-semibold text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:block">
            See All
          </button>
        </div>
      </div>
      <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-3">{cards}</div>
      <div className="text-center">
        <button className="mx-auto rounded-md bg-primary px-8 py-2 font-semibold text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:hidden">
          See All
        </button>
      </div>
    </section>
  );
};

export function Card({ item }: { item: NFT }) {
  return (
    <div
      suppressHydrationWarning={true}
      className="mb-6 max-w-full space-y-2 rounded-lg border-t-2 border-t-primary bg-[#17233a] px-4 py-4"
    >
      <Image
        alt="Nft Image"
        className="aspect-square rounded-lg object-cover object-top"
        src={item!.image}
        suppressHydrationWarning={true}
      />
      <div className="flex justify-between font-semibold tracking-wide">
        <p suppressHydrationWarning={true}>{item!.name}</p>
        <p className="flex items-center gap-1">
          <span>
            <Image
              alt="Ethereum Icon"
              className="h-4 w-6"
              src={ethereumImage}
            />
          </span>
          <span suppressHydrationWarning={true}>{item!.price}ETH</span>
        </p>
      </div>
      <div className="flex justify-between">
        <div>
          <small className="text-gray-400">Ending In</small>
          <p className="flex items-center gap-3">
            <Image alt="Clock Icon" className="h-4 w-4" src={clockImage} />{" "}
            <span className="font-bold">03:24:56</span>
          </p>
        </div>
        <Link href={`/art/${item.id}`}>
          <button className="rounded-lg border border-primary px-4 py-3 font-bold text-primary transition-all duration-[.2s] ease-in hover:scale-[103%] hover:bg-primary hover:text-gray-800 md:px-6">
            Place A Bid
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UniqueArt;
