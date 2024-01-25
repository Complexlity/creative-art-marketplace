import { useFormik } from "formik";
import { useState } from "react";
import { FaHourglassHalf, FaLock, FaUnlockAlt } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { MdGroups } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "~/components/Universal/Card";
import { schema } from "~/utils/schemas";
import MethodOptions, { type Methods } from "./MethodOptions";

import { useAuth } from "@clerk/nextjs";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import useCurrentUser from "~/hooks/useCurrentUser";
import useSupabase from "~/hooks/useSupabaseWithAuth";
import { cn } from "~/utils/libs";
import { Nft } from "~/utils/types";
import { useUploadThing } from "~/utils/uploadthing";

const MINT_PERCENTAGE_COST = 0.2;

export default function MintForm() {
  const { userId } = useAuth();
  const { data: user } = useCurrentUser({});
  const router = useRouter();
  const supabase = useSupabase();
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState<string>();
  const [checked, setChecked] = useState<boolean>(false);
  const [method, setMethod] = useState<Methods>("FIXED_PRICE");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const queryClient = useQueryClient()
  const handleKeyDown = (event: React.KeyboardEvent, value: Methods) => {
    if (event.keyCode === 13) {
      // Perform your action here
      setMethod(value);
    }
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {},
    onUploadError: () => {
      alert("error occurred while uploading");
      throw new Error("something went wrong while uploading");
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
      isCheckingDate: false,
    },
    onSubmit: async (values, { resetForm }) => {
      if (!image) {
        setImageError("NFT image not provided");
        window.scrollTo(0, 0);
        return;
      }

      if (!(userId && user)) {
        toast("Please Login");
        return;
      }
      if (!supabase) return toast("Not Authenticated");
      setIsLoading(true);
      setLoadingMessage("Uploading Image...");
      let uploadError;

      const fileUploadResponse = await startUpload([image!]).catch(
        (err) => (uploadError = err)
      );
      const fileUrl = fileUploadResponse![0].fileUrl;


      if (uploadError) {
        toast("Could not upload file");
        setIsLoading(false);
        setLoadingMessage("");

        return;
      }
      setLoadingMessage("Uploading Nft Details...");
      const slug = slugify(values.title, {
        replacement: "-",
        lower: true,
        trim: true,
      });

      const price = method ===  "OPEN_BIDS" ? values.minBid : values.price;
      let supabaseData;
      let supabaseError;



let { data, error } = await supabase
  .rpc('mint_nft', {
    _name: values.title,
    _price:price,
    _image: fileUrl,
    _user_id: userId,
    _description: values.description,
    _category: values.collections,
    _slug: slug,
    _sale_type: method,
    _start_date: values.startDate ?? "",
    _end_date: values.endDate ?? "",
  })

      if (error) {
 console.log({ error });

 function deleteFilesWithRetries(index: number = 0) {
   if (index == 2) {
     return { success: false, error: "Could Not Delete Files" };
   }
   fetch("/api/delete_uploaded_images", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(fileUploadResponse),
   })
     .then((res) => {
       if (!res.ok) throw new Error("Something went wrong");
       else return res.json();
     })
     .catch((err) => {
       //Retry if delete fails
       deleteFilesWithRetries(index + 1);
     });
 }

 // delete the uploaded file behind the scenes without blocking the ui with two retries
 deleteFilesWithRetries();
toast("Something Went Wrong", {});
        setIsLoading(false);
        setLoadingMessage("");

 if (error && error.code === "PGRST301") {
   //auth issues
   toast("Could Not Authenticate. Refreshing the page");
   setTimeout(() => {
     router.refresh();
   }, 5000);
        }

     return
}

        queryClient.invalidateQueries({
          queryKey: ["nfts"]
        }).then(() => {
        setLoadingMessage("Completed");
        notifyMint();
        setImage(undefined);
        resetForm();
        setLoadingMessage("");
        setImage(undefined);
        setImageUrl("");
        setIsLoading(false);
          router.push("/explore");
        }).catch(err => router.push('/explore'))

    },
    validationSchema: schema,
  });
  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleBlur,
  } = formik;

  function showImage(e: any) {
    const file = e.target.files[0];

    if (file.size > 5000 * 1024) {
      setImageError("File Too Large");
      return;
    }
    let fileUrl = URL.createObjectURL(e.target.files[0]);

    setImage(file);
    setImageUrl(fileUrl);
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
              className={cn(
                `block w-full rounded-lg   border-2  bg-transparent p-2 text-sm text-gray-200 placeholder-gray-500 focus:border-primary focus:ring-primary`,
                {
                  "border-red-400": errors.title && touched.title,
                  "border-green-400": !errors.title && touched.title,
                }
              )}
              placeholder="e.g Crypto Funk"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <small className="text-red-400">
              {errors.title && touched.title ? errors.title : ""}
            </small>
          </div>
          <div className="description mb-6 grid gap-2 text-gray-200">
            <label htmlFor="description" className="">
              Description
            </label>
            <input
              type="text"
              id="description"
              className={cn(
                `
                block w-full rounded-lg border-2 border-gray-600 bg-transparent p-2
               text-sm text-gray-200 placeholder-gray-500 focus:border-primary focus:ring-primary
               `,
                {
                  "border-red-400": errors.description && touched.description,
                  "border-green-400":
                    !errors.description && touched.description,
                }
              )}
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
              <label
                className="method-card flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-600 md:h-32 md:w-32"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, "FIXED_PRICE")}
              >
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
                  tabIndex={-1}
                />
              </label>
              <label
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, "OPEN_BIDS")}
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
                  tabIndex={-1}
                />
              </label>
              <label
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, "TIMED_AUCTION")}
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
                  tabIndex={-1}
                />
              </label>
            </div>
          </div>
          <MethodOptions method={method} formik={formik} />
          <div
            className="unlock previously:grid hidden gap-2 rounded-lg border-2 border-gray-600 p-4"
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
                className={cn(
                  `focus:outline-primary, {"bg-primary": checked} toggle focus:outline-2`
                )}
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
            <select
              id="collections"
              name="collections"
              className={cn(
                `my-select mt-2 block w-full rounded-lg border-2 border-gray-600 bg-gray-900 p-2 text-sm   text-gray-300 placeholder-gray-600 focus:border-primary focus:ring-primary`,
                {
                  base: !values.collections,
                  "border-red-400": errors.collections && touched.collections,
                  "border-green-400":
                    !errors.collections && touched.collections,
                }
              )}
              value={values.collections}
              onChange={handleChange}
              onBlur={handleBlur}
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
              className={cn(
                `block w-full rounded-lg   border-2  border-gray-600 bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary`,
                {
                  "border-red-400": errors.royalties && touched.royalties,
                  "border-green-400": !errors.royalties && touched.royalties,
                }
              )}
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
            className={cn(
              `submit cursor-pointer rounded-full bg-primary px-6 py-2 text-gray-800`,
              {
                "opacity-50": isLoading,
                "cursor-not-allowed": isLoading,
              }
            )}
          />
        </div>

        <div className="preview-item hidden gap-4 self-start ">
          <label>Preview Item</label>
          <Card
            item={
              {
                image: imageUrl,
                name: values.title,
                price: values.price || values.minBid,
                category: values.collections,
                start_date: values.startDate,
                sale_type: method,
              } as unknown as Nft
            }
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
