import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Nft, WithUser } from "~/utils/types";
import BuyNowModal from "./BuyNowModal";
import PlaceBidModal from "./PlaceBidModal";

export default function Modals({ nftData }: { nftData: WithUser<Nft> }) {
  return (
    <div className="flex gap-4 dark">
      {
        nftData.sale_type === "FIXED_PRICE" ?
      <BuyNowModal nftData={nftData} />
        :
      <PlaceBidModal nftData={nftData} />
      }

      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        theme="dark"
        pauseOnHover={false}
      />
    </div>
  );
}
