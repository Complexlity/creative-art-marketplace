import { useState, createContext, useContext, Dispatch, SetStateAction } from "react";
import { partialNFTsData, NFT } from "~/data/nfts";
import { People, people } from "~/data/people";
import { shuffleArray, generateRandomDate, generateRandomNFTPrice } from '~/utils/utitlities'

const randomNftsData = shuffleArray(partialNFTsData);
const randomPeopleData = shuffleArray(people)


const nftsData: NFT[] = randomNftsData.map((item) => {
  item.endTime = generateRandomDate()
  item.price = generateRandomNFTPrice()
  return item as NFT;
})


let peopleData = randomPeopleData
export type GlobalNftsData = {
  nftsData: NFT[];
  peopleData: People[];
  setNftsData: Dispatch<SetStateAction<NFT[]>>
};



const NftsDataContext = createContext<GlobalNftsData>({
  nftsData,
  peopleData,
  setNftsData: function () {
    return
  }
});

interface Props {
  children: React.ReactNode;
}

export const useNftsDataContext = () => useContext(NftsDataContext);

const NftsDataContextProvider = ({ children }: Props) => {
  const [nftsStateData, setNftsData] = useState(nftsData)


  return (
    <NftsDataContext.Provider value={{  nftsData: nftsStateData, peopleData, setNftsData }}>
      {children}
    </NftsDataContext.Provider>
  );
};

export default NftsDataContextProvider;
