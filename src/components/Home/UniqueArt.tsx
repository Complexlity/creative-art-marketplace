
import { NFT } from "~/data/nfts";
import { useNftsDataContext } from "~/contexts/DataContext";
import Card from "~/components/Universal/Card"
import {motion} from 'framer-motion'

const UniqueArt = () => {
  const nftsData = useNftsDataContext().nftsData;
  let cards = [];
  for (let i = 1; i < 4; i++) {
    const item = nftsData[i] as NFT;
    cards.push(<Card key={item.id} item={item} />);
  }

  return (
    <section className="mb-24 text-white px-1">
      <header className="mb-12 tracking-wide">
        <h2 className="text-center text-4xl md:text-start md:text-5xl">
          <span className="text-primary">Amazing</span> and Super{" "}
        </h2>
        <div className="text-center md:flex md:justify-between">
          <h2 className="text-4xl md:text-5xl">
            Unique Art of This <span className="text-primary">Week</span>
          </h2>
          <motion.button  whileHover={{scale: 1.01}}
          whileTap={{scale: 0.95}}  className="hidden rounded-md bg-primary px-8 py-2 font-semibold text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:block">
            See All
          </motion.button>
        </div>
      </header>
      <div className="grid  gap-6 md:grid-cols-2 lg:grid-cols-3">{cards}</div>
      <div className="text-center">
        <motion.button   whileHover={{scale: 1.01}} whileTap={{scale: 0.95}} className="mx-auto rounded-md bg-primary px-8 py-2 font-semibold text-gray-800 hover:bg-blue-950 hover:text-primary hover:outline-dotted hover:outline-2 hover:outline-primary md:hidden">
          See All
        </motion.button>
      </div>
    </section>
  );
};



export default UniqueArt;
