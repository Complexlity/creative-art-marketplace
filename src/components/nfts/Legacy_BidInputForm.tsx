import { Dispatch, SetStateAction, useState } from "react";
import { NFT } from "~/data/nfts";
import type {BuyOptions} from './Legacy_Modals'
import { useFormik } from "formik";
import { toast } from "react-toastify";
// import { Button, Checkbox, Label } from "flowbite-react";
import { bidSchema } from "~/utils/schemas";

export default function Legacy_BidInputForm({
  nftData,
  setOpenModal,
}: {
  nftData: NFT;
  setOpenModal: Dispatch<SetStateAction<BuyOptions | undefined>>;
}){
  const [initialValues, setInitialValues] = useState({
    bid: undefined,
    termsAndConditions: false,
  });
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: { ...initialValues },
      onSubmit: (values, { resetForm }) => {
        notifyBid();
        setInitialValues({ ...initialValues });
        setOpenModal(undefined);
      },
      validationSchema: bidSchema,
    });
  const notifyBid = () =>
    toast("Bid submit successful. We will get back to you shortly 🤗");

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="font-ttramillas text-xl font-medium text-gray-900 dark:text-white">
          {nftData.name}
        </h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="current_price" value="Current Price(ETH)" />
          </div>
          <input
            disabled
            id="current_price"
            type="text"
            placeholder="Type here"
            className="input-bordered input-info input w-full"
            value={nftData.price}
          />
          <small>NOTE: Prices can fluctuate depending on the market</small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="your_bid" value="Enter your bid amount" />
          </div>
          <input
            className={`input-bordered input w-full focus:outline-none ${
              errors.bid && touched.bid
                ? "input-error"
                : touched.bid
                ? "input-success"
                : "input-info"
            }`}
            name="bid"
            type="number"
            required
            value={values.bid}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <small className="text-red-400">
            {errors.bid && touched.bid ? errors.bid : ""}
          </small>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            name="termsAndConditions"
            onChange={handleChange}
          />
          <Label htmlFor="remember">
            I understand the terms of bidding on this platform
          </Label>
        </div>
        {errors.termsAndConditions && (
          <small className="text-red-400">{errors.termsAndConditions}</small>
        )}
        <div className="w-full">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
};
