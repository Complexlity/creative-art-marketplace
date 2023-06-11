/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */

import { type NextPage } from "next";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "~/components/Footer";
import { MdGroups } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { FaHourglassHalf, FaLock, FaUnlockAlt } from "react-icons/fa";
import { motion, AnimatePresence, } from "framer-motion";
import Card from "~/components/Card";
import { useFormik, } from "formik";
import { schema } from "~/utils/schema";
import { StaticImageData } from "next/image";
import { Alert, Modal } from "flowbite-react";
import CountDownComponent from "~/components/Countdown";



type WithChidren = {
  children: React.ReactNode;
};
type methodOptions = "FIXED_PRICE" | "TIMED_AUCTION" | "OPEN_BIDS";

const Mint: NextPage = () => {

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

export function HeroHeader({ children }: WithChidren) {
  return (
    <header className="border-b-2 border-white pb-24 pt-12 lg:pt-20">
      <h1 className="text-center text-5xl text-white md:text-6xl">
        {children}
      </h1>
    </header>
  );
}



function MintForm() {
  const [image, setImage] = useState<StaticImageData>()
  const [imageError, setImageError] = useState<string>()
  const [checked, setChecked] = useState<boolean>(false);
  const [method, setMethod] = useState<methodOptions>("FIXED_PRICE");
  const [submitted, setSubmitted] = useState<boolean>(false)


  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleOptions = (e: any) => {
    const value = e.target.value.toUpperCase();
    setMethod(value);
  };

  const formik  = useFormik({
    initialValues: {
      title: "",
      price: 0,
      minBid: 0,
      description: '',
      royalties: 0,
      collections: "SEL",
      startDate: undefined,
      endDate: undefined,
      isPrice: false,
      isMinBid: false,

    },
    onSubmit: (values, {resetForm}) => {
      console.log("I am here")
      if (!image) {
        setImageError("NFT image not provided")
        return
      }
      setSubmitted(true)
      setImage(undefined)
      resetForm()
    },
    validationSchema: schema
  })
  const { errors, touched, values, handleChange, handleSubmit, handleBlur, } = formik
  const toggleColor = checked ? "bg-primary" : "";
let royaltiesErr = errors.royalties && touched.royalties;
let titleErr = errors.title && touched.title;
let descriptionErr = errors.description && touched.description;
let collectionsErr = errors.royalties && touched.royalties;
console.log({image: typeof image})
  function showImage(e: any) {
    const file = e.target.files[0]
    console.log(file)
    if(file.size > (5000 * 1024)) {
      console.log("File too large")
      setImageError("File Too Large")
      return
    }
    let fileUrl = URL.createObjectURL(e.target.files[0]) as unknown as StaticImageData
    setImage(fileUrl);
    setImageError('')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mint-form grid gap-8 border-b-2 border-b-gray-300 px-4 pb-12 pt-8 text-white"
      >
        <div className="space-y-6">
          <div className="upload-file grid gap-4">
            <label>Upload file</label>
            <div
              className={`grid content-center items-center gap-4 rounded-xl border-4 border-dotted px-4 py-8 ${
                imageError
                  ? "border-red-400"
                  : image
                  ? "border-green-400"
                  : "border-gray-600"
              }`}
            >
              <p className="pt-2 text-center">PNG, JPG, WEBP or PNG</p>
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
                  accept="image/png, image/jpeg, image/png"
                  className="hidden-input"
                  onChange={showImage}
                />
              </div>
            </div>
            <small
              className={`mx-auto ${
                imageError ? "text-red-400" : "text-green-400"
              }`}
            >
              {imageError
                ? imageError
                : image
                ? "File Added Successfully!!"
                : ""}
            </small>
          </div>
          <div className="title mb-6 grid gap-2 text-gray-200">
            <label htmlFor="title" className="">
              Title
            </label>
            <input
              type="text"
              id="title"
              className={`block w-full rounded-lg   border-2  bg-transparent p-2 text-sm text-gray-200 placeholder-gray-500 focus:border-primary focus:ring-primary

 ${
   !touched.title
     ? "border-gray-600"
     : titleErr
     ? "border-red-400"
     : "border-green-400"
 } `}
              placeholder="e.g Crypto Funk"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <small className="text-red-400">
              {titleErr ? errors.title : ""}
            </small>
          </div>
          <div className="description mb-6 grid gap-2 text-gray-200">
            <label htmlFor="description" className="">
              Description
            </label>
            <input
              type="text"
              id="description"
              className={`${
                !touched.description
                  ? "border-gray-600"
                  : descriptionErr
                  ? "border-red-400"
                  : "border-green-400"
              } block w-full rounded-lg border-2 border-gray-600 bg-transparent p-2
             text-sm text-gray-200 placeholder-gray-500 focus:border-primary focus:ring-primary
             `}
              placeholder="e.g This is a very limited item"
              required
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small className="text-red-400">
              {errors.description && touched.description
                ? errors.description
                : ""}
            </small>
          </div>
          <div className="select-method grid gap-4">
            <h3 className="">Select Method</h3>
            <div className="flex flex-wrap items-start gap-4">
              <label className="method-card flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-600 md:h-32 md:w-32">
                <ImPriceTag className="icon h-8 w-8" color={"gray"} />
                <p>Fixed Price</p>
                <input
                  className="hidden-input "
                  type="radio"
                  name="method"
                  id=""
                  value="fixed_price"
                  onChange={toggleOptions}
                  checked={method === "FIXED_PRICE"}
                />
              </label>
              <label
                tabIndex={0}
                className="method-card flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-600 md:h-32 md:w-32 "
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
                  checked={method === "TIMED_AUCTION"}
                />
              </label>
              <label
                tabIndex={0}
                className="method-card flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-600 md:h-32 md:w-32 "
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
                  checked={method === "OPEN_BIDS"}
                />
              </label>
            </div>
          </div>
          <MethodOptions method={method} formik={formik} />
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
            <label htmlFor="collections">Choose collection</label>
            <p className="text-md text-gray-400">
              Unlock content after successful transaction.
            </p>
            <select
              id="collections"
              name="collections"
              className={`my-select mt-2 block w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary
             ${
               !touched.collections
                 ? "base"
                 : collectionsErr
                 ? "error"
                 : "success"
             }`}
              value={values.collections}
              onChange={handleChange}
            >
              <option disabled value="SEL">
                Select Collection
              </option>
              <option value="ART">Digital Art</option>
              <option value="COL">Collectibles</option>
              <option value="GAM">Gaming </option>
              <option value="MUS">Music</option>
              <option value="EST">Real Estate</option>
              <option value="DOM">Domain Names</option>
            </select>
            <small className="text-red-400">
              {errors.collections && touched.collections
                ? errors.collections
                : ""}
            </small>
          </div>
          <div className="royalties mb-6 grid gap-2 text-gray-200">
            <label htmlFor="royalties" className="">
              Royalties (%)
            </label>
            <input
              type="number"
              max="70"
              id="royalties"
              className={`block w-full rounded-lg   border-2  border-gray-600 bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary
             ${
               !touched.royalties
                 ? "border-gray-600"
                 : royaltiesErr
                 ? "border-red-400"
                 : "border-green-400"
             }`}
              placeholder="suggested: 0, 10%, 20%, 30%, Maximum is 70%"
              required
              value={values.royalties}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small className="text-red-400">
              {errors.royalties && touched.royalties ? errors.royalties : ""}
            </small>
          </div>
          <input
            type="submit"
            value="Create Item"
            className="submit cursor-pointer rounded-full bg-primary px-6 py-2 text-gray-800"
          />
        </div>
        <div className="preview-item hidden gap-4 self-start ">
          <label>Preview Item</label>
          <Card
            item={{
              image,
              name: values.title,
              price: values.price || values.minBid,
              category: values.collections,
            }}
            fromInput={true}
          />
        </div>
      </form>
      <AlertModal action={submitted} setAction={setSubmitted}>
      < span >
              <p>
                <span className="font-medium">Congratulations!</span>
                You are going to be rich!! ☺{' '}
              </p>
        </span >
      </AlertModal>
    </>
  );
}

function MethodOptions({ method, formik }: {
  method: methodOptions, formik: any
},) {

  const { errors, touched, values, handleChange,  handleBlur } =
    formik;
  const priceErr = errors.price && touched.price
  const minBidErr = errors.minBid && touched.minBid
  values.isPrice = method == "FIXED_PRICE" ? true : false
  values.isMinBid = method == "TIMED_AUCTION" ? true : false

  return (
    <>
      <AnimatePresence>
        {method == "FIXED_PRICE" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="price mb-6 grid gap-2 text-gray-200"
          >
            <label htmlFor="price" className="">
              Price (ETH)
            </label>
            <input
              type="number"
              id="price"
              className={`block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary
               ${!touched.price ? "border-gray-600" : priceErr ? "border-red-400" : "border-green-400"}`}
              placeholder="Enter price for item"
              required
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small className="text-red-400">
              {priceErr ? errors.price : ""}
            </small>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {method == "TIMED_AUCTION" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="price mb-6 grid gap-2 text-gray-200"
            >
              <label htmlFor="minBid" className="">
                Minimum Bid (ETH)
              </label>
              <input
                type="number"
                id="minBid"
                className={`block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary ${
                  !touched.minBid ? "border-gray-600" : minBidErr ? "border-red-400" : "border-green-400"
                }`}
                placeholder="Enter minimum bid"
                required
                value={values.minBid}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <small className="text-red-400">
                {minBidErr ? errors.minBid : ""}
              </small>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="mb-6 grid gap-2 text-gray-200">
                <label htmlFor="startDate">Starting Date</label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className={`date-picker w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primaryfocus:ring-primary
                  ${touched.endData && values.endDate ? ".success" : ""}
                  `}
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                />
              </div>
              <div className="mb-6 grid gap-2 text-gray-200">
                <label htmlFor="endDate">Ending Date</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className={`date-picker w-full rounded-lg border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary
                  ${touched.endData && values.endDate ? "success" : ""}
                  `}
                  value={values.endDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {method == "OPEN_BIDS" && null}
    </>
  );
}


export function AlertModal({children, action, setAction }: { children: React.ReactNode, action: boolean , setAction: Dispatch<SetStateAction<boolean>> }) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <>
        <Modal
          show={action}
        position={'top-center'}
        dismissible
        >
            <Alert color="success"
             onDismiss={() => setAction(false)}>
            {children}
                  </Alert >
        </Modal>
    </>
  )
}

export default Mint;
