import { useState } from "react";
import Bids from "./Bids";

type Tab = "bids" | 'history'
type HistoryBidsProps = {
  bids: any
}
export default function HistoryBids({ bids: allBids}: HistoryBidsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('bids');
  function getBorderColor(Tab: Tab){
    if(Tab === activeTab) return 'border-primary border-[2.5px]'
    return 'border-gray-500'
  }
  const history = allBids.filter((bid: any) => bid.status !== "pending")
  const bids = allBids.filter((bid: any) => bid.status === 'pending')
  const bidsOrHistory = activeTab === 'bids' ? bids : history
    return (

        <>
    <div className="mb-2 mt-4 flex gap-4 filter">
          <div
            tabIndex={0}
            onClick={() => setActiveTab('bids')}
            className={`cursor-pointer rounded-md border-2 px-5 py-[.05rem] hover:border-white focus:outline-2 ${getBorderColor('bids')}`}
            >
            Bids
          </div>
          <div
            tabIndex={0}
            onClick={() => setActiveTab('history')}
            className={`cursor-pointer rounded-md border-2 px-5 py-[.05rem] text-gray-400 hover:border-white focus:outline-2 ${getBorderColor('history')}`}
          >
            History
          </div>
        </div>
        <div suppressHydrationWarning={true} className="history-bids bids mb-8 grid gap-2.5">
          {bidsOrHistory.map((bid: any) => {
            return <Bids key={bid.id} bid={bid} />;
          })}
        </div>
        </>
        )
}