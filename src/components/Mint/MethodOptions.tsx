import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import MktIcon from "~/components/Universal/MktIcon";
import { cn } from "~/utils/libs";

export type Methods = "FIXED_PRICE" | "TIMED_AUCTION" | "OPEN_BIDS";

export default function MethodOptions({
  method,
  formik,
}: {
  method: Methods;
  formik: any;
}) {
  const { errors, touched, values, handleChange, handleBlur } = formik;

  switch (method) {
    case "OPEN_BIDS":
      values.isPrice = false;
      values.isMinBid = true;
      values.isCheckingDate = false;
      break;
    case "TIMED_AUCTION":
      values.isPrice = true;
      values.isMinBid = false;
      values.isCheckingDate = true;
      break;
    case "FIXED_PRICE":
      values.isPrice = true;
      values.isMinBid = false;
      values.isCheckingDate = false;
  }

  // The touching doesn't alway trigger when you use the date picker but does when you change the date with text
  const startDateErr =
    errors.startDate && (touched.startDate || values.isCheckingDate);
  const endDateErr =
    errors.endDate && (touched.endDate || values.isCheckingDate);

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
              <label htmlFor="price" className="flex gap-1">
                Price{" "}
                <span className="flex items-center">
                  (<MktIcon className="m-0 h-4 w-4 p-0" />)
                </span>
              </label>
              <input
                type="number"
                id="price"
                className={cn(
                  `block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary`,
                  {
                    "border-red-400": errors.price && touched.price,
                    "border-green-400": !errors.price && touched.price,
                  }
                )}
                placeholder="Enter price for item"
                required
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <small className="text-red-400">
                {errors.price && touched.price ? errors.price : ""}
              </small>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {method == "OPEN_BIDS" && (
            <>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="price mb-6 grid gap-2 text-gray-200"
              >
                <label htmlFor="minBid" className="flex gap-1">
                  Minimum Bid
                  <span>
                    (<MktIcon className="m-0 h-4 w-4 p-0" />)
                  </span>
                </label>
                <input
                  type="number"
                  id="minBid"
                  className={cn(
                    `block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary`,
                    {
                      "border-red-400": errors.minBid && touched.minbid,
                      "border-green-400": !errors.minBid && touched.minbid,
                    }
                  )}
                  placeholder="Enter minimum bid"
                  required
                  value={values.minBid}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <small className="text-red-400">
                  {errors.minBid && touched.minBid ? errors.minBid : ""}
                </small>
              </motion.div>
            </>
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
                <label htmlFor="price" className="flex gap-1">
                  Starting Price{" "}
                  <span className="flex items-center">
                    (<MktIcon className="m-0 h-4 w-4 p-0" />)
                  </span>
                </label>
                <input
                  type="number"
                  id="price"
                  className={cn(
                    `block w-full rounded-lg   border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary`,
                    {
                      "border-red-400": errors.price && touched.price,
                      "border-green-400": !errors.price && touched.price,
                    }
                  )}
                  placeholder="Enter price for item"
                  required
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <small className="text-red-400">
                  {errors.price && touched.price ? errors.price : ""}
                </small>
              </motion.div>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <div className=" grid gap-2 text-gray-200">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      className={cn(
                        `date-picker w-full rounded-lg border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary`,
                        {
                          "border-green-400": values.startDate && !startDateErr,
                          "border-red-400": startDateErr,
                        }
                      )}
                      value={values.startDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <small className="text-red-400">
                    {startDateErr ? errors.startDate : ""}
                  </small>
                </div>
                <div>
                  <div className="grid gap-2 text-gray-200">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      className={cn(
                        `date-picker w-full rounded-lg border-2 border-gray-600  bg-transparent p-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:ring-primary`,
                        {
                          "border-green-400": values.endDate && !endDateErr,
                          "border-red-400": endDateErr,
                        }
                      )}
                      value={values.endDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <small className="text-red-400">
                    {endDateErr ? errors.endDate : ""}
                  </small>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </>
  );
}
