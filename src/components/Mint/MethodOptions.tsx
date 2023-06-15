import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export type Methods = "FIXED_PRICE" | "TIMED_AUCTION" | "OPEN_BIDS";

export default function MethodOptions({
    method,
    formik,
  }: {
    method: Methods;
    formik: any;
  }) {
    const { errors, touched, values, handleChange, handleBlur } = formik;
    const priceErr = errors.price && touched.price;
    const minBidErr = errors.minBid && touched.minBid;
    values.isPrice = method == "FIXED_PRICE" ? true : false;
    values.isMinBid = method == "TIMED_AUCTION" ? true : false;
  
    return (
      <>
      <LayoutGroup>
        <AnimatePresence>
          {method == "FIXED_PRICE" && (
            <motion.div
              layout
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
                 ${
                   !touched.price
                     ? "border-gray-600"
                     : priceErr
                     ? "border-red-400"
                     : "border-green-400"
                 }`}
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
              layout
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
                    !touched.minBid
                      ? "border-gray-600"
                      : minBidErr
                      ? "border-red-400"
                      : "border-green-400"
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
              layout
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
                    className={`date-picker focus:border-primaryfocus:ring-primary w-full   rounded-lg border-2  border-gray-600 bg-transparent p-2 text-sm text-white placeholder-gray-500
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
        <AnimatePresence>{method == "OPEN_BIDS" && null}</AnimatePresence>
        </LayoutGroup>
      </>
    );
  }
  
