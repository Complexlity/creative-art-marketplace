import { StaticImageData } from 'next/dist/client/image';
import image from '../../public/nft-1.jpg'
import {nanoid} from 'nanoid'

type NFTS = {
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

const nftsData: NFTS[] = [
    {
      name: "AbstractVision",
      price: 150.25,

      image: image
    },
  {

name: "NatureExplorer",
price: 75.9,
    image:image

},
  {

    name: "CosmicDream",
    price: 25.75,

    image:image
  },
{
  name: "DigitalWhale",
  price: 99.99,

  image:image
},
 {
  name: "EtherealGarden",
  price: 180.5,

    image:image

  },
 {
name: "PixelJungle",
price: 50.75,
    image:image

  },
 {
  name: "DreamyMountain",
price: 120.0,
     image:image

   },
{
name: "CrystalWave",
price: 35.25,
    image:image

  },
 {
  name: "UrbanReflection",
  price: 60.75,

  image:image
},
{
name: "NeonSerenity",
price: 90.0,
image:image
},
{
name: "MysticSunrise",
price: 15.5,
image:image
},
 {
name: "CelestialWaters",
price: 100.99,
image:image
},
{
  name: "EnchantedForest",
price: 45.75,
image:image
},{

name: "GalacticVoyager",
price: 85.5,
image:image
},{
  name: "DreamscapeJourney",
  price: 65.0,

  image:image
}
  ]

nftsData.forEach(item => {
  item.id = nanoid(5)
  item.endTime = generateRandomDate()
})


export default nftsData as unknown as Required<NFTS>