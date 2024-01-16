import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { nftsData as initialNftsData, NFT } from "~/legacy_data/nfts";
import { People, people } from "~/legacy_data/people";
import { shuffleArray } from "~/utils/randoms";

const nftsData = shuffleArray(initialNftsData);
const randomPeopleData = shuffleArray(people);

let peopleData = randomPeopleData;
export type GlobalNftsData = {
  nftsData: NFT[];
  peopleData: People[];
  setNftsData: Dispatch<SetStateAction<NFT[]>>;
};

const NftsDataContext = createContext<GlobalNftsData>({
  nftsData,
  peopleData,
  setNftsData: function () {
    return;
  },
});

interface Props {
  children: React.ReactNode;
}

export const useNftsDataContext = () => useContext(NftsDataContext);

const NftsDataContextProvider = ({ children }: Props) => {
  const [nftsStateData, setNftsData] = useState(nftsData);

  return (
    <NftsDataContext.Provider
      value={{ nftsData: nftsStateData, peopleData, setNftsData }}
    >
      {children}
    </NftsDataContext.Provider>
  );
};

export default NftsDataContextProvider;
