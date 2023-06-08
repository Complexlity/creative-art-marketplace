import { StaticImageData } from "next/dist/client/image";
import image from "../../public/nft-1.jpg";
import yieldNumber from "./yieldNumbers";



export type NFT = {
  id: string;
  name: string;
  price: number,
  endTime: string;
  image: StaticImageData;
  creator: string,
  description: string,
  category: string,
};

export function generateNFTPrice() {
  // Define the range of possible values for NFT cost
  const minPrice = 0.01; // Minimum cost in ETH
  const maxPrice = 1; // Maximum cost in ETH
  // Generate a random value within the range
  const randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;
  return Number(randomPrice.toFixed(2))
}


function generateRandomDate() {
  const now = Date.now();
  const sevenDays = 2 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const randomTime = Math.floor(Math.random() * sevenDays); // Random time within the range
  return new Date(randomTime);
}



let partialNFTsData: Partial<NFT>[] = [
  {
    category:"Art"
    ,id: "1",
    name: "Abstract Vision",
    price:generateNFTPrice(),
    image: image,
    creator: "John Doe",
    description:
      "A mesmerizing NFT artwork depicting the surreal beauty of nature, with vibrant colors and intricate details. This piece captures the essence of tranquility and invites viewers to explore the depths of their imagination.",

  },
  {
    category:"Collectibles"
    ,id: "2",
    name: "Nature Explorer",
    price:generateNFTPrice(),
    image: image,
    creator: "Ryan Miller",
    description:
      "A social commentary NFT series addressing pressing issues. Through thought-provoking imagery and narratives, the artist challenges norms and sheds light on inequality, climate change, and unrest. Each artwork sparks introspection, inspiring conversations and urging action for social transformation.",

  },
  {
    category:"Real Estate"
    ,id: "3",
    name: "Cosmic Dream",
    price:generateNFTPrice(),
    image: image,
    creator: "Grace Thompson",
    description:
      "A whimsical NFT collection filled with magical creatures and fantastical landscapes. Each artwork transports viewers to a world of enchantment and imagination, reminding them of the power of dreams and the limitless possibilities of the human mind.",
  },
  {
    category:"Gaming"
    ,id: "4",
    name: "Digital Whale",
    price:generateNFTPrice(),
    creator: "William Adams",
    description:
      "A nature-inspired NFT series that celebrates the beauty and diversity of the natural world. From majestic landscapes to delicate flora and fauna, each artwork invites viewers to appreciate the wonders of the Earth and foster a sense of environmental stewardship.",
    image: image,
  },
  {
    category:"Music"
    ,id: "5",
    name: "Ethereal Garden",
    price:generateNFTPrice(),
    image: image,
    creator: "Emma Wilson",
    description:
      "An experimental NFT collection pushing the boundaries of artistic expression. Through a combination of multimedia elements and interactive features, the artist creates immersive digital experiences that challenge traditional notions of art.",
  },
  {
    category:"Domain Names"
    ,id: "6",
    name: "Pixel Jungle",
    price:generateNFTPrice(),
    image: image,
    creator: "Daniel Brown",
    description:
      "A minimalist NFT series that embraces simplicity and elegance. With clean lines and subtle colors, each artwork represents a moment of zen, offering viewers a respite from the chaos of the modern world and a chance to find inner peace.",
  },
  {
    category:"Art"
    ,id: "7",
    name: "Dreamy Mountain",
    price:generateNFTPrice(),
    image: image,
    creator: "Olivia Lee",
    description:
      "An introspective NFT collection that delves into the depths of the human psyche. Through intricate patterns and symbolic imagery, the artist invites viewers on a journey of self-discovery and reflection, exploring the complexities of the mind.",
  },
  {
    category:"Collectibles"
    ,id: "8",
    name: "Crystal Wave",
    price:generateNFTPrice(),
    image: image,
    creator: "Michael Chen",
    description:
      "A futuristic NFT series exploring the intersection of technology and humanity. With sleek designs and futuristic elements, the artist presents a vision of a world where humans and machines coexist, sparking conversations about our collective future.",
  },
  {
    category:"Real Estate"
    ,id: "9",
    name: "Urban Reflection",
    price:generateNFTPrice(),
    image: image,
    creator: "Sophia Anderson",
    description:
      "A nostalgic NFT collection evoking memories of childhood and innocence. Each artwork encapsulates a moment of joy and wonder, inviting viewers to reconnect with their inner child and find solace in the beauty of simple things.",
  },
  {
    category:"Gaming"
    ,id: "10",
    name: "Neon Serenity",
    price:generateNFTPrice(),
    image: image,
    creator: "Alex Rodriguez",
    description:
      "A vibrant and energetic NFT series capturing the spirit category of urban life. With bold strokes and vivid colors, the artist brings street art to the digital realm, celebrating the raw energy and creativity of the city streets.",
  },
  {
    category:"Music"
    ,id: "11",
    name: "Mystic Sunrise",
    price:generateNFTPrice(),
    image: image,
    creator: "Emily Davis",
    description:
      "An ethereal NFT collection inspired by dreams and the subconscious mind. Each artwork portrays a surreal landscape filled with otherworldly creatures and hidden meanings, inviting viewers to explore the boundaries of reality.",
  },
  {
    category:"Domain Names"
    ,id: "12",
    name: "Celestial Waters",
    price:generateNFTPrice(),
    image: image,
    creator: "Jane Smith",
    description:
      "An abstract NFT creation that merges geometric shapes and organic forms in a harmonious dance. This artwork represents the artist's exploration of the interplay between chaos and order, inviting viewers to contemplate the mysteries of existence.",
  },
  {
    category:"Art"
    ,id: "13",
    name: "Enchanted Forest",
    price:generateNFTPrice(),
    image: image,
    creator: "Sophie Walker",
    description:
      "A surreal NFT collection that blurs the line between reality and fantasy. Each artwork combines unexpected elements and dreamlike imagery, inviting viewers to question the nature of perception and explore the realms of the subconscious.",
  },
  {
    category:"Collectibles"
    ,id: "14",
    name: "Galactic Voyager",
    price:generateNFTPrice(),
    image: image,
    creator: "Ethan Hughes",
    description:
      "A time-inspired NFT series that explores the concept of temporality. Through abstract visuals and fragmented narratives, the artist examines the passage of time and its impact on human experiences, prompting viewers to contemplate the fleeting nature of existence.",
  },
  {
    category:"Real Estate"
    ,id: "15",
    name: "Dreamscape Journey",
    price:generateNFTPrice(),
    image: image,
    creator: "Ava Bennett",
    description:
      "An emotive NFT collection expressing the depths of human emotions. Through evocative colors and expressive brushstrokes, each artwork captures the essence of joy, sadness, love, and more, resonating with viewers on a deeply personal level.",
  },
];

const nftsData: NFT[] = partialNFTsData.map((item) => {
  item.endTime = generateRandomDate().toDateString();
  return item as NFT
});

const randomNumberGenerator = yieldNumber(nftsData.length);

export { nftsData, randomNumberGenerator };
