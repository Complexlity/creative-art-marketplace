import Footer from "~/components/Footer";
import NavBar from "~/components/NavBar";
import { HeroHeader } from "./mint";
import { Card } from "~/components/Card";
import { useNftsDataContext } from "~/utils/DataContext";
import {useEffect, useState} from 'react'
import { NFT } from "~/utils/nfts";
import useDebounce from "~/utils/useDebounce";

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

type Search = string | number | readonly string[] | undefined


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

  const [search, setSearch] = useState<Search>('')
  const debouncedSearch = useDebounce(search, 500)
  const [displayedData, setDisplayedData] = useState(nftsData)
  useEffect(() => {
    searchByName(debouncedSearch)
  }, [debouncedSearch])

  useEffect(() => {
    if (displayedData.length <= 6) {
      setShowingCondition({minned: true, maxxed: true})
    }
    else  {
      setShowingCondition({ ...showingCondition, maxxed: false });
    setSeeMore({
    initialValue: 6,
    step: 3,
    max: displayedData.length,
  })
    }
  }, [displayedData])

  function searchByName(searchValue: string) {
    if (searchValue.length > 0) {
      setDisplayedData(nftsData.filter((data) => {
        return data.name.toLowerCase().includes(searchValue.toLowerCase())
      })
      )
    }
    else {
      setDisplayedData(nftsData)

    }
  }

console.log({displayedData, data:{...seeMore, ...showingCondition}})
  const disabledStyles = "bg-gray-400 hover:scale-[100%] hover:shadow-none text-blue-900 opacity-[60%] cursor-not-allowed"
  return (
    <section className="grid gap-12 border-b-2 border-b-gray-300 pb-12 pt-8">
      <div className="filters grid items-center gap-4 md:grid-cols-4">
        <div className="relative flex w-full self-end">
          <div className="pointer-events-none absolute inset-y-0 right-[2px] flex  items-center">
            <AiOutlineSearch className="white h-6 w-6" />
          </div>
          <input
            type="search"
            id="email-address-icon"
            className="block w-full rounded-lg border-2 border-gray-600 bg-transparent p-2 text-sm text-gray-200 placeholder:text-gray-300  focus:border-primary focus:ring-primary"
            placeholder="Search Nft..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <select
          id="categories"
          className="my-select mt-2 block w-full max-w-[250px] rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary"
          defaultValue={"SEL"}
        >
          <option disabled value="SEL">
            All Categories
          </option>
          <option value="MUS">Music</option>
          <option value="GAM">Gaming </option>
          <option value="EST">Real Estate</option>
          <option value="ART">Digital Art</option>
          <option value="COL">Collectibles</option>
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
            {displayedData.slice(0, seeMore.initialValue).map((item) => {
              return <Card key={item.id} item={item} />;
            })}
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-4 text-center">
          <button
            onClick={showMore}
            className={`flex items-center justify-center gap-2 rounded-full px-4 py-2   ${
              showingCondition.maxxed
                ? disabledStyles
                : "bg-primary text-gray-800 hover:scale-[102%] hover:shadow-round hover:shadow-gray-400"
            }`}
          >
            Load More
            <BsArrowDownCircleFill className="h-6 w-6 text-green-700" />
          </button>
          <button
            onClick={showLess}
            className={`flex items-center  gap-2 rounded-full px-4 py-2
            ${
              showingCondition.minned
                ? disabledStyles
                : "bg-gray-500 hover:shadow-round hover:shadow-primary"
            }`}
          >
            See Less{" "}
            <BsFillArrowUpCircleFill className="h-6 w-6 text-rose-700" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Explore;
