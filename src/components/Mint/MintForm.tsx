import { useState } from "react";
import { MdGroups } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { FaHourglassHalf, FaLock, FaUnlockAlt } from "react-icons/fa";
import Card from "~/components/Universal/Card";
import { useFormik } from "formik";
import { schema } from "~/utils/schemas";
import { StaticImageData } from "next/image";
import MethodOptions, {type Methods} from './MethodOptions'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {  useAuth } from '@clerk/nextjs'

import { useUploadThing } from "~/utils/uploadthing"
import { useRouter } from "next/navigation";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import slugify from "slugify";

export default function MintForm() {
  const { userId } = useAuth()
  const router = useRouter()
  const supabase = useSupabase()
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState('')
    const [imageError, setImageError] = useState<string>();
    const [checked, setChecked] = useState<boolean>(false);
    const [method, setMethod] = useState<Methods>("FIXED_PRICE");
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")

    const toggleChecked = () => {
      setChecked(!checked);
    };
 const { startUpload } = useUploadThing("imageUploader", {
   onClientUploadComplete: () => {

   },
   onUploadError: () => {
     alert("error occurred while uploading");
     throw new Error("something went wrong while uploading")
   },
   onUploadBegin: () => {
    //  alert("upload has begun");
   },
 });





    const toggleOptions = (e: any) => {
      const value = e.target.value.toUpperCase();
      setMethod(value);
    };

  const notifyMint = () => toast("Successfully Minted New NFT");

    const formik = useFormik({
      initialValues: {
        title: "",
        price: 0,
        minBid: 0,
        description: "",
        royalties: 0,
        collections: "SEL",
        startDate: undefined,
        endDate: undefined,
        isPrice: false,
        isMinBid: false,
      },
      onSubmit: async (values, { resetForm }) => {
        if (!userId) {
          toast("Pleas Login")
          return
        }
        if (!image) {
          setImageError("NFT image not provided");
          return;
        }
        if (!supabase) return toast("Not Authenticated")
        setIsLoading(true)
        setLoadingMessage("Uploading Image...")
        let uploadError;

        const res = await startUpload([image!]).catch((err) => uploadError = err)
        const fileUrl = res![0].fileUrl;

        if (uploadError) {
          toast("Could not upload file")
          setIsLoading(false)

          return
        }
        setLoadingMessage("Uploading Nft Details...")
        const slug = slugify(values.title, {
          replacement: '-',
          lower: true,
          trim: true
        })
        const { data, error } = await supabase
        .from("nft")
        .insert([{ name: values.title, price:  values.price || values.minBid, image: fileUrl, creator: userId , description: values.description, category: values.collections, slug: slug }])
        .select()
        if (data) {
          setLoadingMessage("Completed")
          notifyMint()
          setImage(undefined);
          resetForm();
          setLoadingMessage("")
          setImage(undefined)
          setImageUrl('')
          setIsLoading(false)
          router.push('/explore')
        }
        else if (error) {
          toast("Something Went Wrong", {
          })

        }
      },
      validationSchema: schema,
    });
    const { errors, touched, values, handleChange, handleSubmit, handleBlur } =
      formik;
    const toggleColor = checked ? "bg-primary" : "";
    let royaltiesErr = errors.royalties && touched.royalties;
    let titleErr = errors.title && touched.title;
    let descriptionErr = errors.description && touched.description;
    let collectionsErr = errors.royalties && touched.royalties;

    function showImage(e: any) {
      const file = e.target.files[0];

      if (file.size > 5000 * 1024) {

        setImageError("File Too Large");
        return;
      }
      let fileUrl = URL.createObjectURL(
        e.target.files[0]
      );

      setImage(file);
      setImageUrl(fileUrl)
      setImageError("");
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
                    : imageUrl
                    ? "border-green-400"
                    : "border-gray-600"
                }`}
              >
                <p className="pt-2 text-center">PNG, JPG, WEBP or PNG</p>
                <div className="text-center">
                  <label
                    htmlFor="nft"
                    className="inline cursor-pointer rounded-full bg-primary px-6 py-1 text-gray-800"
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
                  : imageUrl
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
                <option value="art">Digital Art</option>
                <option value="collectibles">Collectibles</option>
                <option value="gaming">Gaming </option>
                <option value="music">Music</option>
                <option value="estate">Real Estate</option>
                <option value="domain">Domain Names</option>
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
              disabled={isLoading}
              type="submit"
              value={isLoading ? loadingMessage : "Create Item"}
              className={`submit cursor-pointer rounded-full bg-primary px-6 py-2 text-gray-800 ${
                isLoading ? "opacity-50" : ""
              }`}
            />
          </div>

          <div className="preview-item hidden gap-4 self-start ">
            <label>Preview Item</label>
            <Card
              item={{
                image: imageUrl as unknown as StaticImageData,
                name: values.title,
                price: values.price || values.minBid,
                category: values.collections,
              }}
              fromInput={true}
            />
          </div>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          closeOnClick
          theme="dark"
          pauseOnHover={false}
        />
      </>
    );
  }