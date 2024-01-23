import { useEffect, useState } from "react";
import { Card } from "~/components/Universal/Card";
import useDebounce from "~/hooks/useDebounce";

import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { Nft, WithUser } from "~/utils/types";
import { cn, convertStringDateToMilleseconds } from "~/utils/libs";
import { Methods } from "../Mint/MethodOptions";

type SeeMore = {
  initialValue: number;
  step: number;
  max: number;
};

const INITIAL_NUMBER_OF_CARDS_TO_SHOW = 6;
const STEP = 3;
const CHEAP = 30;
const AFFORDABLE = 50;

type Search = string;

export default function CardsContainer({
  nftsData,
}: {
  nftsData: WithUser<Nft>[];
}) {
  const [search, setSearch] = useState<Search>("");
  const debouncedSearch = useDebounce(search, 500);
  const [priceRange, setPriceRange] = useState<string>("default");
  const [category, setCategory] = useState("default");
  const [expiryDate, setExpiryDate] = useState("0");
  const [saleType, setSaleType] = useState("default");
  const [auctionState, setAuctionState] = useState("default");
  const [displayedData, setDisplayedData] = useState(nftsData);

  const [NUMBER_OF_CARDS_SHOWN, setDisplayedLength] = useState(
    getNumberOfCardsShow(displayedData)
  );

  function getNumberOfCardsShow(data: unknown[]) {
    return data.length > INITIAL_NUMBER_OF_CARDS_TO_SHOW
      ? INITIAL_NUMBER_OF_CARDS_TO_SHOW
      : data.length;
  }

  const MAXIMUM_NUMBER_OF_CARDS_THAT_CAN_BE_SHOWN = displayedData.length;

  const willSeeMore =
    MAXIMUM_NUMBER_OF_CARDS_THAT_CAN_BE_SHOWN > NUMBER_OF_CARDS_SHOWN;
  const willSeeLess = NUMBER_OF_CARDS_SHOWN > INITIAL_NUMBER_OF_CARDS_TO_SHOW;

  function showMore() {
    if (!willSeeMore) return;
    const remaining =
      MAXIMUM_NUMBER_OF_CARDS_THAT_CAN_BE_SHOWN - NUMBER_OF_CARDS_SHOWN;
    setDisplayedLength((prev) => prev + (remaining > STEP ? STEP : remaining));
  }
  function showLess() {
    if (!willSeeLess) return;
    if (NUMBER_OF_CARDS_SHOWN % STEP === 0) {
      setDisplayedLength((prev) => prev - STEP);
    } else {
      setDisplayedLength((prev) => prev - (NUMBER_OF_CARDS_SHOWN % STEP));
    }
  }

  useEffect(() => {
    const totalData = aggregateQuery(
      debouncedSearch,
      saleType,
      auctionState,
      category,
      expiryDate,
      priceRange
    );
    setDisplayedData(totalData);
    setDisplayedLength(getNumberOfCardsShow(totalData));
  }, [
    debouncedSearch,
    saleType,
    auctionState,
    category,
    expiryDate,
    priceRange,
  ]);

  function aggregateQuery(
    search: string,
    saleType: string,
    auctionState: string,
    category: string,
    date: string,
    priceRange: string
  ) {
    const dateNum = Number(date);
    const items = [...nftsData];
    const newItems = [];
    for (let i = 0; i < items.length; i++) {
      let curr = items[i] as WithUser<Nft>;
      if (
        searchBySaleType(curr, saleType) &&
        searchByAuctionState(curr, auctionState) &&
        searchByName(curr, search) &&
        searchByCategory(curr, category) &&
        // searchByDate(curr, dateNum) &&
        searchByPrice(curr, priceRange)
      ) {
        newItems.push(curr);
      }
    }
    return newItems;
  }

  function searchByAuctionState(item: WithUser<Nft>, auctionState: string) {
    if (auctionState === "default" || item.sale_type !== "TIMED_AUCTION")
      return true;
    const now = new Date().getTime();
    

    const startDate = convertStringDateToMilleseconds(item.start_date);

    const itemIsStarted = now > startDate ? "started" : "not_started";
    return itemIsStarted === auctionState;
  }

  function searchBySaleType(item: WithUser<Nft>, saleType: string) {
    if (saleType === "default") return true;
    const itemSaleType = item.sale_type.toLowerCase() as Lowercase<Methods>;
    return itemSaleType === saleType;
  }
  function searchByName(item: WithUser<Nft>, searchString: string) {
    if (!searchString) return true;
    const itemName = item.name.toLowerCase();
    searchString = searchString.toLowerCase();
    return itemName.includes(searchString);
  }

  function searchByCategory(item: WithUser<Nft>, category: string) {
    if (category === "default") return true;
    let itemCategory = item.category;
    return itemCategory === category;
  }

  // function searchByDate(item: Nft, date: number) {
  //   switch (date) {
  //     case 24:
  //       return item.endTime < timeInMilliseconds(24);
  //     case 48:
  //       return (
  //         item.endTime >= timeInMilliseconds(24) &&
  //         item.endTime < timeInMilliseconds(48)
  //       );
  //     case 49:
  //       return item.endTime >= timeInMilliseconds(48);
  //     default:
  //       return true;
  //   }
  // }

  function searchByPrice(item: WithUser<Nft>, priceRange: string) {
    switch (priceRange) {
      case "cheap":
        return item.price < CHEAP;
      case "affordable":
        return item.price >= CHEAP && item.price < AFFORDABLE;
      case "costly":
        return item.price > AFFORDABLE;
      default:
        return true;
    }
  }

  const disabledStyles =
    "bg-gray-400 hover:scale-[100%] hover:shadow-none text-blue-900 opacity-[60%] cursor-nodefaultllowed";
  return (
    <>
      <div className="flex flex-1 flex-col gap-6 border-b-2 border-b-gray-300 py-6 pb-12">
        <div className="filters grid items-start gap-2 md:flex">
          <div className="searchBar relative  flex w-full basis-1/3 ">
            <div className="pointer-events-none absolute inset-y-0 right-[2px] flex  items-center">
              <AiOutlineSearch className="white h-6 w-6" />
            </div>
            <input
              type="search"
              id="email-address-icon"
              className="block w-full rounded-lg border-2 border-gray-600 bg-transparent px-2 py-[.43rem] text-sm text-purple-400 placeholder:text-gray-300  focus:border-primary focus:ring-primary"
              placeholder="Search Nft..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="flex w-full items-start gap-2">
            <select
              id="sale_type"
              className={cn(
                "my-select block w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary",
                {
                  "text-purple-400": saleType !== "default",
                  "border-amber-700": saleType === "fixed_price",
                  "border-blue-700": saleType === "open_bids",
                  "border-b-red-700 border-l-green-700 border-r-red-700 border-t-green-700":
                    saleType === "timed_auction",
                  "border-red-700":
                    saleType === "timed_auction" && auctionState === "started",
                  "border-green-800":
                    saleType === "timed_auction" &&
                    auctionState === "not_started",
                }
              )}
              value={saleType}
              onChange={(e) => setSaleType(e.target.value)}
            >
              <option value="default">Sale Type</option>
              <option value="fixed_price">Fixed Price</option>
              <option value="open_bids">Open Bids</option>
              <option value="timed_auction">Timed Auction</option>
            </select>
            {saleType === "timed_auction" && (
              <select
                id="auction_state"
                className={cn(
                  "my-select block w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary",
                  {
                    "text-purple-400": auctionState !== "default",
                  }
                )}
                value={auctionState}
                onChange={(e) => setAuctionState(e.target.value)}
              >
                <option value="default">Auction State</option>
                <option value="not_started">Not Started</option>
                <option value="started">Started</option>
              </select>
            )}
            <select
              id="categories"
              className={cn(
                `my-select block w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary`,
                {
                  "text-purple-400": category !== "default",
                }
              )}
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
            {/* <select
              id="expiry-time"
              className="my-select block w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            >
              <option value="0">Expiry Time</option>
              <option value="24">{`< 24 hours`}</option>
              <option value="48">24 - 48hours</option>
              <option value="49">{`> 48hours`}</option>
            </select> */}
            <select
              id="items-type"
              className={cn(
                `my-select block w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary
              `,
                {
                  "text-purple-400": priceRange !== "default",
                }
              )}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="default">Price</option>
              <option value="cheap">{`Cheap (< 💲${CHEAP})`}</option>
              <option value="affordable">
                {`Affordable (💲${CHEAP} - 💲${AFFORDABLE})`}
              </option>
              <option value="costly">{`Costly (> 💲${AFFORDABLE})`}</option>
            </select>
          </div>
        </div>
        <div className="cards flex flex-1 flex-col">
          <AnimatePresence>
            {displayedData.length === 0 ? (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  ease: "easeIn",
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex w-full flex-1 items-center justify-center"
              >
                <p className="font-roboto text-5xl md:text-6xl">
                  No Item Found
                </p>
              </motion.div>
            ) : (
              <div
                suppressHydrationWarning={true}
                className="grid flex-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence>
                  {displayedData.slice(0, NUMBER_OF_CARDS_SHOWN).map((item) => {
                    return <Card key={item.id} item={item} />;
                  })}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
          {displayedData.length !== 0 && (
            <div className="flex justify-center gap-4 text-center">
              <button
                onClick={showMore}
                className={`flex items-center justify-center gap-2 rounded-full px-4 py-2   ${
                  willSeeMore
                    ? "bg-primary text-gray-800 hover:scale-[102%] hover:shadow-round hover:shadow-gray-400"
                    : disabledStyles
                }`}
              >
                Load More
                <BsArrowDownCircleFill className="h-6 w-6 text-green-700" />
              </button>
              <button
                onClick={showLess}
                className={`flex items-center  gap-2 rounded-full px-4 py-2
              ${
                willSeeLess
                  ? "bg-gray-500 hover:shadow-round hover:shadow-primary"
                  : disabledStyles
              }`}
              >
                See Less{" "}
                <BsFillArrowUpCircleFill className="h-6 w-6 text-rose-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
