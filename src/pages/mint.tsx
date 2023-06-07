import { type NextPage } from "next";
import Head from "next/head";
import { useState } from 'react'
import NavBar from "../components/NavBar";
import Footer from "~/components/Footer";
import { Card } from "~/components/UniqueArt";
import { MdGroups } from 'react-icons/md'
import { ImPriceTag } from 'react-icons/im'
import { FaHourglassHalf, FaLock, FaUnlockAlt } from "react-icons/fa";

type WithChidren = {
  children: React.ReactNode
}
type methodOptions = "FIXED_PRICE" | "TIMED_AUCTION" | "OPEN BID"

const Mint: NextPage = () => {
  const [checked, setChecked] = useState<boolean>(true)


  return (
    <>
      <Head>
        <title>Mint Your Own NFT</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 ">
          <NavBar />
          <HeroHeader>
            Create <span className="text-primary"> Legendary </span>NFT
          </HeroHeader>
          <MintForm />
          <Footer />
        </div>
      </div>
    </>
  );
};

export function HeroHeader({children}: WithChidren) {
  return (
    <div className="border-b-2 border-white pt-10 pb-24">
      <h1 className="text-center text-5xl text-white md:text-6xl">
        {children}
      </h1>
    </div>
  );
}


function MintForm() {
  const [checked, setChecked] = useState<boolean>(false)
  const [method, setMethod] = useState<methodOptions>("FIXED_PRICE")
  const toggleChecked = () => {
    setChecked(!checked)
  }

  const toggleOptions = (e: any) => {
    const value = e.target.value.toUpperCase()
    setMethod(value)
  }

  let toggleColor = checked ? "bg-primary" : "";
  function submitForm(e: any) {
    e.preventDefault()
    alert("Hello World")
  }

  return (
    <form
      onSubmit={submitForm}
      className="mint-form grid gap-8 border-b-2 border-b-gray-300 px-4 pb-12 pt-8 text-white "
    >
      <div className="space-y-6">
        <div className="upload-file grid gap-4">
          <label>Upload file</label>
          <div className="grid content-center items-center gap-4 rounded-xl border-4 border-dotted border-gray-400 px-4 py-8">
            <p className="pt-2 text-center">
              PNG, JPG, GIF, WEBP or MP4. Max 200mb.
            </p>
            <div className="text-center">
              <label
                htmlFor="nft"
                className="inline rounded-full bg-primary px-6 py-1 text-gray-800"
              >
                Browse
              </label>
              <input
                type="file"
                id="nft"
                name="nft"
                accept="image/png, image/jpeg"
                className="hidden-input"
              />
            </div>
          </div>
        </div>
        <div className="select-method grid gap-4">
          <h3 className="">Select Method</h3>
          <div className="flex items-start gap-4">
            <label className="method-card flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-600">
              <ImPriceTag className="icon h-8 w-8" color={"gray"} />
              <p>Fixed Price</p>
              <input
                className="hidden-input "
                type="radio"
                name="method"
                id=""
                value="fixed_price"
                onChange={toggleOptions}
              />
            </label>
            <label
              tabIndex={0}
              className="method-card   flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-600 "
            >
              <FaHourglassHalf className="icon h-8 w-8" color={"gray"} />
              <p>Timed auction</p>
              <input
                className="hidden-input"
                type="radio"
                name="method"
                id=""
                value="timed_auction"
                onChange={toggleOptions}
              />
            </label>
            <label
              tabIndex={0}
              className="method-card  flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-600 "
            >
              <MdGroups className="icon h-8 w-8" color={"gray"} />
              <p>Open Bids</p>
              <input
                className="hidden-input"
                type="radio"
                name="method"
                id=""
                value="open_bids"
                onChange={toggleOptions}
              />
            </label>
          </div>
        </div>
        <MethodOptions method={method} />
        <div
          className="unlock grid gap-2 rounded-lg border-2 border-gray-600 p-4"
          tabIndex={0}
        >
          <div className="header flex justify-between ">
            <p className="flex items-center gap-1">
              {checked ? (
                <FaUnlockAlt className="text-primary" />
              ) : (
                <FaLock className="text-gray-600" />
              )}{" "}
              Unlock once purchased{" "}
            </p>
            <input
              type="checkbox"
              className={`toggle ${toggleColor} focus:outline-2 focus:outline-primary`}
              checked={checked}
              onChange={toggleChecked}
            />
          </div>
          <p className="text-gray-400">
            Unlock content after successful transaction
          </p>
        </div>

        <div className="choose-collection grid gap-1 text-white">
          <label htmlFor="">Choose collection</label>
          <p className="text-md text-gray-400">
            Unlock content after successful transaction.
          </p>
          <select
            id="collections"
            className="my-select mt-2 block w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
            defaultValue={"SEL"}
          >
            <option disabled value="SEL">
              Select Collection
            </option>
            <option value="DIG">Digital Art</option>
            <option value="COL">Collectibles</option>
            <option value="GAM">Gaming </option>
            <option value="MUS">Music</option>
          </select>
        </div>
        <div className="title mb-6 grid gap-2 text-gray-200">
          <label htmlFor="title" className="">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g Crypto Funk"
            required
          />
        </div>
        <div className="description mb-6 grid gap-2 text-gray-200">
          <label htmlFor="description" className="">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g This is a very limited item"
            required
          />
        </div>
        <div className="royalties mb-6 grid gap-2 text-gray-200">
          <label htmlFor="royalties" className="">
            Royalties (%)
          </label>
          <input
            type="number"
            max="70"
            id="royalties"
            className="block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            placeholder="suggested: 0, 10%, 20%, 30%, Maximum is 70%"
            required
          />
        </div>
        <button className="rounded-full bg-primary px-6 py-1 text-gray-800">
          Create Item
        </button>
      </div>

      <div className="preview-item hidden gap-4 self-start md:grid">
        <label>Preview Item</label>
        <Card />
      </div>
    </form>
  );
}

function MethodOptions({ method }: { method: methodOptions }) {
  return (
    <>
      {method == "FIXED_PRICE" && (
        <div className="price mb-6 grid gap-2 text-gray-200">
          <label htmlFor="price" className="">
            Price (ETH)
          </label>
          <input
            type="number"
            id="price"
            className="block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter price for item"
            required
          />
        </div>
      )}
      {method == "TIMED_AUCTION" && (
        <>
          <div className="price mb-6 grid gap-2 text-gray-200">
            <label htmlFor="price" className="">
              Minimum Bid (ETH)
            </label>
            <input
              type="number"
              id="min-bid"
              className="block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter minimum bid"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-6 grid gap-2 text-gray-200">
              <label htmlFor="start_date">Starting Date</label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                className=" date-picker w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6 grid gap-2 text-gray-200">
              <label htmlFor="end_date">Ending Date</label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                className="date-picker w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </>
      )}
      {method == "OPEN BID" && null}
    </>
  );
}

export default Mint;
