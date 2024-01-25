import { TabsTrigger, TabsList, TabsContent, Tabs } from "~/components/ui/tabs"
import { CardContent, Card } from "~/components/ui/card"
import { type SVGProps } from "react"
import { cn } from "~/utils/libs";

export default function ArtistDetails() {
  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <header className="flex flex-col items-center justify-between border-b p-4 md:flex-row md:p-6">
        <div className="flex items-center space-x-4">
          <img
            alt="Artist Avatar"
            className="rounded-full"
            height="100"
            src="/placeholder.svg"
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Artist Name</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Artist Description
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 md:mt-0 md:flex-row md:gap-6">
          <div className="flex items-center space-x-2">
            <DollarSignIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-lg font-bold">$45,231.89</p>
          </div>
          <div className="flex items-center space-x-2">
            <PaintbrushIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-lg font-bold">120 Artworks</p>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-lg font-bold">75 Sold</p>
          </div>
          <div className="flex items-center space-x-2">
            <StoreIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-lg font-bold">30 Purchases</p>
          </div>
        </div>
      </header>
      <main className="flex flex-col py-4">
        <Tabs className="w-full" defaultValue="listed">
          <TabsList className="grid w-full grid-cols-3 dark:bg-gray-900 dark:text-white">
            <TabsTrigger value="listed" className="">
              {/* Listed */}
              Listed
            </TabsTrigger>
            <TabsTrigger value="purchases" className="">
              Purchases
            </TabsTrigger>
            <TabsTrigger value="sales" className="">
              Sales
            </TabsTrigger>
          </TabsList>
          <TabsContent value="listed">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent>
                  <img
                    alt="Artwork Image"
                    className="h-auto w-full object-cover"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                  <h3 className="mt-2 text-lg font-bold">Artwork Title</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Artwork Description
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="purchases" />
          <TabsContent value="sales" />
        </Tabs>
      </main>
    </div>
  );
}

 type TSVGElementProps = SVGProps<SVGSVGElement>
function DollarSignIcon(props: TSVGElementProps  ) {
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
  )
}


function PaintbrushIcon(props: TSVGElementProps) {
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
      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0-2.82 0L8 7l9 9 1.59-1.59a2 0-2.82L17 10l4.37-4.37a2.12 2.12 1 0-3-3Z" />
      <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
      <path d="M14.5 17.5 4.5 15" />
    </svg>
  )
}


function ShoppingCartIcon(props: TSVGElementProps) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 1.58h9.78a2 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function StoreIcon(props: TSVGElementProps) {
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
      <path d="m2 7 4.41-4.41A2 2 0 1 7.83 2h8.34a2 1.42.59L22" />
      <path d="M4 12v8a2 2 0 2h12a2 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0-2-2h-2a2 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 1-2 2v0a2.7 2.7 1-1.59-.63.7.7 0-.82 0A2.7 1 16 12a2.7 12 8 4 12v0a2 1-2-2V7" />
    </svg>
  )
}
