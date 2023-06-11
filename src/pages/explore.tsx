import Footer from "~/components/Footer";
import NavBar from "~/components/NavBar";
import { HeroHeader } from "./mint";
import { Card } from "~/components/Card";
import { useNftsDataContext } from "~/utils/DataContext";
import {useState} from 'react'
import { NFT } from "~/utils/nfts";

import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowDownCircleFill, BsFillArrowUpCircleFill} from 'react-icons/bs'
import { AnimatePresence } from 'framer-motion'

const Explore = () => {
  const nftsData = useNftsDataContext().nftsData;
  return (
    <div className="main">
      <div className="mx-auto max-w-[1200px] px-4 text-white md:px-8">
        <NavBar />
        <HeroHeader>Explore</HeroHeader>
        <ExploreCards nftsData={nftsData} />
        <Footer />
      </div>
    </div>
  );
};

type SeeMore = {
  initialValue: number,
  step: number,
  max: number
}

function ExploreCards({nftsData} : { nftsData: NFT[]}) {
  const [seeMore, setSeeMore] = useState<SeeMore>({
    initialValue: 6,
    step: 3,
    max: nftsData.length,
  })
  const [showingCondition, setShowingCondition] = useState({
    maxxed: false,
    minned: true
  })

  function showMore() {
    if(showingCondition.maxxed) return
    if(showingCondition.minned) setShowingCondition({...showingCondition, minned: false})
    const { initialValue, step, max, } = seeMore

    let next = initialValue + step
    if(next >= max){
      next = max
      setShowingCondition({...showingCondition, maxxed: true})
    }
    setSeeMore({ ...seeMore, initialValue: next })

  }

  function showLess() {
  if (showingCondition.minned) return;
  if (showingCondition.maxxed) {
    setShowingCondition(() =>{
      return { ...showingCondition, maxxed: false }
    });
  }

  const { initialValue, step } = seeMore;
  let prev = initialValue - step;

  if (prev <= 6) {
    setShowingCondition(() => {
      return { ...showingCondition, minned: true }});
    prev = 6;
  }

  setSeeMore({ ...seeMore, initialValue: prev });

  }

  const disabledStyles = "bg-gray-400 hover:scale-[100%] hover:shadow-none text-blue-900 opacity-[60%] cursor-not-allowed"
  console.log({seeMore, showingCondition})
  return (
    <section className="grid gap-12 border-b-2 border-b-gray-300 pb-12 pt-8">
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
        <div
          suppressHydrationWarning={true}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
          {nftsData.slice(0, seeMore.initialValue).map((item) => {
            return <Card key={item.id} item={item} />;
          })}
          </AnimatePresence>
        </div>
        <div className="text-center flex justify-center gap-4">
          <button
            onClick={showMore}
            className={`flex gap-2 items-center rounded-full px-4 justify-center py-2   ${
              showingCondition.maxxed
                ? disabledStyles
                : "bg-primary hover:scale-[102%] hover:shadow-round hover:shadow-gray-400 text-gray-800"
            }`}
          >
            {showingCondition.maxxed ? "All Loaded" : "Load More"}<BsArrowDownCircleFill className="text-green-700 w-6 h-6"  />
          </button>
          <button
            onClick={showLess}
            className={`flex gap-2  items-center rounded-full px-4 py-2
            ${showingCondition.minned ? disabledStyles : "bg-gray-500 hover:shadow-round hover:shadow-primary"}`}
          >
            See Less <BsFillArrowUpCircleFill className="text-rose-600 w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Explore;
