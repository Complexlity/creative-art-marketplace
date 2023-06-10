import { useState, createContext, useContext, useEffect } from "react";
import { partialNFTsData, NFT } from "./nfts";
import { People, people } from "./people";

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    //@ts-ignore
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateNFTPrice() {
  // Define the range of possible values for NFT cost
  const minPrice = 0.01; // Minimum cost in ETH
  const maxPrice = 1; // Maximum cost in ETH
  // Generate a random value within the range
  const randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;
  return Number(randomPrice.toFixed(2));
}

function generateRandomDate() {
  const now = Date.now();
  const sevenDays = 2 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const randomTime = Math.floor(Math.random() * sevenDays); // Random time within the range
  return new Date(randomTime);
}

// console.log({partialNFTsData})
const randomNftsData = shuffleArray(partialNFTsData);
const randomPeopleData = shuffleArray(people)
// console.log({randomNftsData})

const nftsData: NFT[] = randomNftsData.map((item) => {
  item.endTime = generateRandomDate().toDateString();
  item.price = generateNFTPrice()
  return item as NFT;
})


let peopleData = randomPeopleData
export type GlobalNftsData = {
  nftsData: NFT[];
  peopleData: People[]
};



const NftsDataContext = createContext<GlobalNftsData>({
  nftsData,
  peopleData
});

interface Props {
  children: React.ReactNode;
}

export const useNftsDataContext = () => useContext(NftsDataContext);

const NftsDataContextProvider = ({ children }: Props) => {
  // console.log({nftsData})
  return (
    <NftsDataContext.Provider value={{  nftsData, peopleData }}>
      {children}
    </NftsDataContext.Provider>
  );
};

export default NftsDataContextProvider;
