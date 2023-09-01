import { Button, Modal } from "flowbite-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { NFT } from "~/data/nfts";
import BidInputForm from "./Legacy_BidInputForm";
import "react-toastify/dist/ReactToastify.css";

export type BuyOptions = "BUY_NOW" | "PLACE_BID";
export function Modals({ nftData }: { nftData: NFT }) {
  const [openModal, setOpenModal] = useState<BuyOptions | undefined>();
  const props = { openModal, setOpenModal };

  const notify = () => toast("Thank you for shopping at creative arts 😁");

  return (
    <>
      <div className="purchase-options flex gap-4">
        <motion.button
          onClick={() => setOpenModal("BUY_NOW")}
          className="rounded-full bg-primary px-6 py-2 font-bold text-gray-800 hover:shadow-round hover:shadow-gray-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Buy Now
        </motion.button>
        <motion.button
          onClick={() => props.setOpenModal("PLACE_BID")}
          className="rounded-full bg-gray-500 px-6 py-2 hover:shadow-round hover:shadow-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Place a bid
        </motion.button>
      </div>
      <Modal
        className="backdrop-blur"
        dismissible
        show={openModal === "BUY_NOW"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>{nftData.name}</Modal.Header>
        <Modal.Body className="">
          <div className="space-y-6 ">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {nftData.description}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to purchase this item for {nftData.price}
              ETH?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.setOpenModal((state) => undefined);
              notify();
            }}
          >
            I accept
          </Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        dismissible
        show={openModal === "PLACE_BID"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <BidInputForm nftData={nftData} setOpenModal={setOpenModal} />
        </Modal.Body>
      </Modal>
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
