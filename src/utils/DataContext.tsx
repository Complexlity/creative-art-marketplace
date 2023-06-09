import { useState, createContext, useContext } from "react";
import { nftsData, NFT } from "./nfts";

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    //@ts-ignore
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const randomNftsData = shuffleArray(nftsData);

export type GlobalNftsData = {
  nftsData: NFT[];
};
const NftsDataContext = createContext<GlobalNftsData>({
  nftsData: randomNftsData,
});

interface Props {
  children: React.ReactNode;
}

export const useNftsDataContext = () => useContext(NftsDataContext);

const NftsDataContextProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <NftsDataContext.Provider value={{ nftsData }}>
      {children}
    </NftsDataContext.Provider>
  );
};

export default NftsDataContextProvider;
