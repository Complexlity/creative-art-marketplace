import { StaticImageData } from 'next/dist/client/image';
import image from '../../public/nft-1.jpg'
import { nanoid } from 'nanoid'
import yieldNumber from "./yieldNumbers";

export type NFTS = {
  id?: string;
  name: string;
  price: number;
  endTime?: Date;
  image: StaticImageData;
};




function generateRandomDate() {
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const randomTime = Math.floor(Math.random() * sevenDays); // Random time within the range
  return new Date(now + randomTime);
}

let partialNFTsData: NFTS[] = [
    {
      name: "Abstract Vision",
      price: 150.25,

      image: image
    },
  {

name: "Nature Explorer",
price: 75.9,
    image:image

},
  {

    name: "Cosmic Dream",
    price: 25.75,

    image:image
  },
{
  name: "Digital Whale",
  price: 99.99,

  image:image
},
 {
  name: "Ethereal Garden",
  price: 180.5,

    image:image

  },
 {
name: "Pixel Jungle",
price: 50.75,
    image:image

  },
 {
  name: "Dreamy Mountain",
price: 120.0,
     image:image

   },
{
name: "Crystal Wave",
price: 35.25,
    image:image

  },
 {
  name: "Urban Reflection",
  price: 60.75,

  image:image
},
{
name: "Neon Serenity",
price: 90.0,
image:image
},
{
name: "Mystic Sunrise",
price: 15.5,
image:image
},
 {
name: "Celestial Waters",
price: 100.99,
image:image
},
{
  name: "Enchanted Forest",
price: 45.75,
image:image
},{

name: "Galactic Voyager",
price: 85.5,
image:image
},{
  name: "Dreamscape Journey",
  price: 65.0,

  image:image
}
  ]

const nftsData: Required<NFTS>[] = partialNFTsData.map(item => {
  item.id = nanoid(5)
  item.endTime = generateRandomDate()
  return item as Required<NFTS>
})

const randomNumberGenerator = yieldNumber(nftsData.length)


export { nftsData, randomNumberGenerator  }