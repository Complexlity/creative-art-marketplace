import Image from 'next/image'
import nftImage from '../../public/nft-1.jpg'
import ethereumImage from "../../public/ethereum.png";
import clockImage from '../../public/clock.png'


const UniqueArt = () => {
  return (
    <section className="mb-24 text-white">
      <div className="mb-6">
        <h2 className="text-center text-5xl md:text-start">
          <span className="text-primary">Amazing</span> and Super{" "}
        </h2>
        <div className="text-center md:flex md:justify-between">
          <h2 className="text-5xl">
            Unique Art of This <span className="text-primary">Week</span>
          </h2>
          <button className="hidden rounded-md bg-primary px-8 py-2 font-semibold text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:block">
            See All
          </button>
        </div>
      </div>
      <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="text-center">
        <button className="mx-auto rounded-md bg-primary px-8 py-2 font-semibold text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:hidden">
          See All
        </button>
      </div>
    </section>
  );
};

export function Card() {
  return (
    <div className="mb-6 space-y-2 rounded-lg border-t-2 border-t-primary bg-[#17233a] px-4 py-4 max-w-full">
      <Image
        alt="Nft Image"
        className="aspect-square rounded-lg object-cover object-top"
        src={nftImage}
      />
      <div className="flex justify-between font-semibold tracking-wide">
        <p>Cyberpunk Cocomo</p>
        <p className="flex items-center gap-1">
          <span>
            <Image alt="Ethereum Icon" className="h-4 w-4" src={ethereumImage} />
          </span>
          <span>490ETH</span>
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
        <button className="rounded-lg border border-primary px-6 py-3 font-bold text-primary transition-all duration-[.2s] ease-in hover:scale-[103%] hover:bg-primary hover:text-gray-800">
          Place A Bid
        </button>
      </div>
    </div>
  );
}

export default UniqueArt;
