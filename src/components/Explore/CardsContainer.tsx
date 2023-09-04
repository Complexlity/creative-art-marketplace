import { useEffect, useState } from "react";
import { Card } from "~/components/Universal/Card";
import { NFT } from "~/data/nfts";
import useDebounce from "~/hooks/useDebounce";

import { AnimatePresence } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowDownCircleFill, BsFillArrowUpCircleFill} from 'react-icons/bs'
import { getCategory } from "~/utils/libs";

type SeeMore = {
  initialValue: number;
  step: number;
  max: number;
};

type Search = string | number | readonly string[] | undefined;

export default function CardsContainer({ nftsData }: { nftsData: NFT[] }) {
  const [search, setSearch] = useState<Search>("");
  const debouncedSearch = useDebounce(search, 500);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [category, setCategory] = useState("default");
  const [expiryDate, setExpiryDate] = useState("0");
  const [displayedData, setDisplayedData] = useState(nftsData);
  const [seeMore, setSeeMore] = useState<SeeMore>({
    initialValue: 6,
    step: 3,
    max: displayedData.length,
  });
  const [showingCondition, setShowingCondition] = useState({
    maxxed: false,
    minned: true,
  });

  function showMore() {
    if (showingCondition.maxxed) return;
    if (showingCondition.minned)
      setShowingCondition({ ...showingCondition, minned: false });
    const { initialValue, step, max } = seeMore;

    let next = initialValue + step;
    if (next >= max) {
      next = max;
      setShowingCondition({ ...showingCondition, maxxed: true });
    }
    setSeeMore({ ...seeMore, initialValue: next });
  }
  function showLess() {
    if (showingCondition.minned) return;
    if (showingCondition.maxxed) {
      setShowingCondition(() => {
        return { ...showingCondition, maxxed: false };
      });
    }

    const { initialValue, step } = seeMore;
    let prev = initialValue - step;

    if (prev <= 6) {
      setShowingCondition(() => {
        return { ...showingCondition, minned: true };
      });
      prev = 6;
    }

    setSeeMore({ ...seeMore, initialValue: prev });
  }

  useEffect(() => {
    setDisplayedData(
      aggregateQuery(debouncedSearch, category, expiryDate, priceRange)
    );
  }, [debouncedSearch, category, expiryDate, priceRange]);

  useEffect(() => {
    if (displayedData.length <= 6) {
      setShowingCondition({ minned: true, maxxed: true });
    } else {
      setShowingCondition({ ...showingCondition, maxxed: false });
      setSeeMore({
        initialValue: 6,
        step: 3,
        max: displayedData.length,
      });
    }
  }, [displayedData]);

  const timeInMilliseconds = (hours: number) => hours * 60 * 60 * 1000;

  function aggregateQuery(
    search: string,
    category: string,
    date: string,
    priceRange: string
  ) {
    const dateNum = Number(date);
    const items = [...nftsData];
    const newItems = [];
    for (let i = 0; i < items.length; i++) {
      let curr = items[i] as NFT;
      if (
        searchByName(curr, search) &&
        searchByCategory(curr, category) &&
        searchByDate(curr, dateNum) &&
        searchByPrice(curr, priceRange)
      ) {
        newItems.push(curr);
      }
    }
    return newItems;
  }

  function searchByName(item: NFT, searchString: string) {
    if (!searchString) return true;
    const itemName = item.name.toLowerCase();
    searchString = searchString.toLowerCase();
    return itemName.includes(searchString);
  }

  function searchByCategory(item: NFT, category: string) {
    if (category === "default") return true;
    let itemCategory = item.category
    
    // itemCategory = getCategory[itemCategory].toLowerCase();
    // category = category.toLowerCase();
    return itemCategory === category;
  }

  function searchByDate(item: NFT, date: number) {
    switch (date) {
      case 24:
        return item.endTime < timeInMilliseconds(24);
      case 48:
        return (
          item.endTime >= timeInMilliseconds(24) &&
          item.endTime < timeInMilliseconds(48)
        );
      case 49:
        return item.endTime >= timeInMilliseconds(48);
      default:
        return true;
    }
  }

  function searchByPrice(item: NFT, priceRange: string) {
    switch (priceRange) {
      case "cheap":
        return item.price < 1;
      case "affordable":
        return item.price >= 1 && item.price < 3;
      case "costly":
        return item.price > 3;
      default:
        return true;
    }
  }

  const disabledStyles =
    "bg-gray-400 hover:scale-[100%] hover:shadow-none text-blue-900 opacity-[60%] cursor-not-allowed";
  return (
    <>
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="default">All Categories</option>
            <option value="music">Music</option>
            <option value="gaming">Gaming </option>
            <option value="estate">Real Estate</option>
            <option value="art">Digital Art</option>
            <option value="collectibles">Collectibles</option>
            <option value="domain">Domain Names</option>
          </select>
          <select
            id="expiry-time"
            className="my-select mt-2 block w-full max-w-[250px] rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          >
            <option value="0">Expiry Time</option>
            <option value="24">{`< 24 hours`}</option>
            <option value="48">24 - 48hours</option>
            <option value="49">{`> 48hours`}</option>
          </select>
          <select
            id="items-type"
            className="my-select mt-2 block w-full max-w-[250px] rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="all">Price</option>
            <option value="cheap">{`Cheap (< 1ETH)`}</option>
            <option value="affordable">{`Affordable (1 - 3 ETH)`}</option>
            <option value="costly">{`Costly (> 3ETH)`}</option>
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
    </>
  );
}
