import { useQuery } from "@tanstack/react-query";
import { type SVGProps } from "react";
import Card from "~/components/Universal/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import useCurrentUser from "~/hooks/useCurrentUser";
import { getNftsByUserId } from "~/utils/queries";
import { Nft, NftUser } from "~/utils/types";
import { Brush } from 'lucide-react';
import MktIcon from "../Universal/MktIcon";

export default function ArtistDetails({ artist }: { artist: NftUser }) {
  const loggedInUserId = useCurrentUser({}).data?.userId
  const artistId = artist.user_id
  const isSameUser = loggedInUserId === artistId

  let { data, error, isLoading } = useQuery({
    queryKey: ["artist", artist.user_url],
    queryFn: getNftsByUserId.bind(null, artist.user_id),
  });
  let listedItems: Nft[] = []
  let unlistedItems: Nft[] = []

  if (data) {
    data.forEach(item => {
      if (item.status === "listed") listedItems.push(item)
      else unlistedItems.push(item)
    })
  }


  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <header className="flex flex-col items-center justify-between border-b p-4 sm:flex-row md:p-6">
        <div className="flex items-center space-x-4">
          <img
            alt="Artist Avatar"
            className="rounded-full"
            height="100"
            src={artist.imageUrl}
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{artist.username}</h1>
            {/* <p className="text-gray-500 dark:text-gray-400">
              Artist Description
            </p> */}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:gap-6">
          <div className="flex items-center space-x-2">
            <MktIcon className="h-5 w-5" />
            <p className="text-lg font-bold">${artist.game_currency}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brush className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-lg font-bold">{isSameUser ? data?.length || 0 : listedItems.length} Artworks</p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-lg font-bold">75 Sold</p>
          </div>
          <div className="flex items-center space-x-2">
            <StoreIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-lg font-bold">30 Purchases</p>
          </div> */}
        </div>
      </header>
      <main className="flex flex-1 flex-col py-4">
        {!data && isLoading || !data && loggedInUserId === undefined ? (
          // TODO: Add a loading component or skeleton
          <p>Loading ...</p>
        ) : error ? (
          <p>Something went wrong. Please Try again </p>
        ) :

            isSameUser
              ?
              <AuthUserNfts allItems={data} listedItems={listedItems} unlistedItems={unlistedItems} />
              : <NormalUserNfts listedItems={listedItems} />

      }
      </main>
    </div>
  );
}

function AuthUserNfts({ allItems, listedItems, unlistedItems }: {
  allItems: Nft[] | null | undefined,
  listedItems: Nft[] | null | undefined,
  unlistedItems: Nft[] | null | undefined,

}) {

  return (
    <Tabs className="flex w-full flex-1 flex-col" defaultValue="all">
      <TabsList className="flex w-full gap-1 py-[22px] dark:bg-gray-900 dark:text-white">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="listed">Listed</TabsTrigger>
        <TabsTrigger value="unlisted">Unlisted</TabsTrigger>
      </TabsList>
      <TabsContent className="" value="all">
        {!allItems ? (
          <div className="grid flex-1 items-center justify-center text-3xl">
            You Have No NFTS
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allItems.map((item) => {
              return <Card key={item.id} item={item} />;
            })}
          </div>
        )}
      </TabsContent>
      <TabsContent value="listed">
        {!listedItems || listedItems.length === 0 ? (
          <div className="grid flex-1 items-center justify-center text-3xl">
            You Have No Listed NFTS
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listedItems!.map((item) => {
              return <Card key={item.id} item={item} />;
            })}
          </div>
        )}
      </TabsContent>
      <TabsContent value="unlisted">
        {!unlistedItems || unlistedItems.length == 0 ? (
          <div className="grid flex-1 items-center justify-center text-3xl">
            You Have No Unlisted NFTS
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {unlistedItems.map((item) => {
              return <Card key={item.id} item={item} />;
            })}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

function NormalUserNfts({ listedItems }: { listedItems: Nft[] | null | undefined }) {
  return (
    <>
{
  !listedItems
    ?
    <div className="grid flex-1 items-center justify-center text-3xl">
            This Artist Hast No Item
          </div>
    :
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
   {listedItems!.map((item) => {
     return <Card key={item.id} item={item} />;
   })}
   </div>

      }
      </>
  )
}

type TSVGElementProps = SVGProps<SVGSVGElement>;
function DollarSignIcon(props: TSVGElementProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 7h5a3.5 1 7H6" />
    </svg>
  );
}

