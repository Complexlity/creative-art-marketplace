import Footer from "~/components/Footer";
import NavBar from "~/components/NavBar";
import { HeroHeader } from "./mint";
import { AiOutlineSearch } from 'react-icons/ai'
import { Card } from "~/components/UniqueArt";
import { nftsData, randomNumberGenerator, NFTS
 } from "~/utils/nfts";
import { useEffect, useState } from "react";

const Explore = () => {
  return (
    <div className="main">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 text-white" >
      <NavBar />

        <HeroHeader>
          Explore
        </HeroHeader>
        <ExploreCards />

      <Footer />
      </div>
  </div>
  );
}

function ExploreCards(){
    const [generator] = useState(randomNumberGenerator)
    const [cardss, setCardss] = useState<JSX.Element[]>([]);
    useEffect(() => {
    let cards: JSX.Element[] = []
    for (let i = 0; i < 12; i++) {
      let generatedIdx = generator.next().value;
      if(!generatedIdx) generatedIdx = 0
      const item = nftsData[generatedIdx] as Required<NFTS>;
      cards.push(<Card key={item.id} item={item} />);
      }
    setCardss(cards)
  }, [])

  return (
    <section className="grid gap-12 border-b-2 border-b-gray-300 pt-8 pb-12">
      <div className="filters grid items-center gap-4 md:grid-cols-4">
        <div className="relative w-full self-end">
          <input
            type="search"
            id="search-dropdown"
            className=" z-20 block w-full rounded-lg border-2 border-gray-600 border-l-gray-700 bg-transparent px-2  py-2 text-sm  text-white placeholder-gray-400 ring-blue-500 focus:border-primary focus:outline-none"
            placeholder="Search Items here...."
            required
          />
          <button
            type="submit"
            className="absolute
            bottom-0 right-0 top-0
            flex items-center justify-center  rounded-r-lg border bg-primary px-4 font-medium hover:bg-yellow-300 focus:outline-none  focus:ring-4 focus:ring-yellow-300 md:px-3"
          >
            <AiOutlineSearch className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <select
          id="categories"
          className="my-select mt-2 block w-full max-w-[250px] rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary"
          defaultValue={"SEL"}
        >
          <option disabled value="SEL">
            All Categories
          </option>
          <option value="DIG">Digital Art</option>
          <option value="COL">Collectibles</option>
          <option value="GAM">Gaming </option>
          <option value="MUS">Music</option>
        </select>
        <select
          id="buy-now"
          className="my-select mt-2 block w-full max-w-[250px] rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary"
          defaultValue={"SEL"}
        >
          <option disabled value="SEL">
            Status
          </option>
          <option value="DIG">Buy now</option>
          <option value="COL">On Auction</option>
          <option value="GAM">has Offers</option>
        </select>
        <select
          id="items-type"
          className="my-select mt-2 block w-full max-w-[250px] rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary"
          defaultValue={"SEL"}
        >
          <option disabled value="SEL">
            Items Type
          </option>
          <option value="DIG">Single Item</option>
          <option value="COL">Bundles</option>
        </select>
      </div>
      <div className="cards">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardss}
        </div>
        <div className="load-more text-center">
          <button className="mx-auto justify-center rounded-full bg-primary px-6 py-2 text-gray-800">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}


export default Explore
