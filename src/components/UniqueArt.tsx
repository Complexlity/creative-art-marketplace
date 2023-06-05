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
          <button className="hidden rounded-md bg-primary px-8 py-2 font-semibold text-gray-800 md:block">
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
        <button className="mx-auto rounded-md bg-primary px-8 py-2 font-semibold text-gray-800 md:hidden">
          See All
        </button>
      </div>
    </section>
  );
};

function Card() {
  return (
    <div className="mb-6 space-y-2 rounded-lg border-t-2 border-t-primary bg-[#17233a] px-4 py-4">
      <img
        className="aspect-square rounded-lg object-cover object-top"
        src="/nft-1.jpg"
      />
      <div className="flex justify-between font-semibold tracking-wide">
        <p>Cyberpunk Cocomo</p>
        <p className="flex items-center gap-1">
          <span>
            <img className="h-4 w-4" src="/ethereum.png" />
          </span>
          <span>490ETH</span>
        </p>
      </div>
      <div className="flex justify-between">
        <div>
          <small className="text-gray-400">Ending In</small>
          <p className="flex items-center gap-3">
            <img className="h-4 w-4" src="/clock.png" />{" "}
            <span className="font-bold">03:24:56</span>
          </p>
        </div>
        <button className="rounded-lg border border-primary px-6 py-3 font-bold text-primary">
          Place A Bid
        </button>
      </div>
    </div>
  );
}

export default UniqueArt;
