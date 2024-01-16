import { StaticImageData } from "next/image";
import image1 from "/public/legacy_nfts/1.png";
import image2 from "/public/legacy_nfts/2.png";
import image3 from "/public/legacy_nfts/3.png";
import image4 from "/public/legacy_nfts/4.png";
import image5 from "/public/legacy_nfts/5.png";
import image6 from "/public/legacy_nfts/6.png";
import image7 from "/public/legacy_nfts/7.png";
import image8 from "/public/legacy_nfts/8.png";
import image9 from "/public/legacy_nfts/9.png";
import image10 from "/public/legacy_nfts/10.png";
import image11 from "/public/legacy_nfts/11.png";
import image12 from "/public/legacy_nfts/12.png";
import image13 from "/public/legacy_nfts/13.png";
import image14 from "/public/legacy_nfts/14.png";
import image15 from "/public/legacy_nfts/15.png";
import {
  generateRandomNFTPrice,
  generateRandomTimeDifference,
} from "~/utils/randoms";

export type NFT = {
  id: string;
  name: string;
  price: number;
  endTime: number;
  image: StaticImageData | string;
  creator: string;
  description: string;
  category: string;
  fromInput: boolean;
};

let partialNFTsData: Partial<NFT>[] = [
  {
    category: "Art",
    id: "1",
    name: "Abstract Vision",
    image: image1,
    creator: "John Doe",
    description:
      "A mesmerizing NFT artwork depicting the surreal beauty of nature, with vibrant colors and intricate details. This piece captures the essence of tranquility and invites viewers to explore the depths of their imagination.",
  },
  {
    category: "Collectibles",
    id: "2",
    name: "Nature Explorer",
    image: image2,
    creator: "Ryan Miller",
    description:
      "A social commentary NFT series addressing pressing issues. Through thought-provoking imagery and narratives, the artist challenges norms and sheds light on inequality, climate change, and unrest. Each artwork sparks introspection, inspiring conversations and urging action for social transformation.",
  },
  {
    category: "Real Estate",
    id: "3",
    name: "Cosmic Dream",
    image: image3,
    creator: "Grace Thompson",
    description:
      "A whimsical NFT collection filled with magical creatures and fantastical landscapes. Each artwork transports viewers to a world of enchantment and imagination, reminding them of the power of dreams and the limitless possibilities of the human mind.",
  },
  {
    category: "Gaming",
    id: "4",
    name: "Digital Whale",
    creator: "William Adams",
    description:
      "A nature-inspired NFT series that celebrates the beauty and diversity of the natural world. From majestic landscapes to delicate flora and fauna, each artwork invites viewers to appreciate the wonders of the Earth and foster a sense of environmental stewardship.",
    image: image4,
  },
  {
    category: "Music",
    id: "5",
    name: "Ethereal Garden",
    image: image5,
    creator: "Emma Wilson",
    description:
      "An experimental NFT collection pushing the boundaries of artistic expression. Through a combination of multimedia elements and interactive features, the artist creates immersive digital experiences that challenge traditional notions of art.",
  },
  {
    category: "Domain Names",
    id: "6",
    name: "Pixel Jungle",
    image: image6,
    creator: "Daniel Brown",
    description:
      "A minimalist NFT series that embraces simplicity and elegance. With clean lines and subtle colors, each artwork represents a moment of zen, offering viewers a respite from the chaos of the modern world and a chance to find inner peace.",
  },
  {
    category: "Art",
    id: "7",
    name: "Dreamy Mountain",
    image: image7,
    creator: "Olivia Lee",
    description:
      "An introspective NFT collection that delves into the depths of the human psyche. Through intricate patterns and symbolic imagery, the artist invites viewers on a journey of self-discovery and reflection, exploring the complexities of the mind.",
  },
  {
    category: "Collectibles",
    id: "8",
    name: "Crystal Wave",
    image: image8,
    creator: "Michael Chen",
    description:
      "A futuristic NFT series exploring the intersection of technology and humanity. With sleek designs and futuristic elements, the artist presents a vision of a world where humans and machines coexist, sparking conversations about our collective future.",
  },
  {
    category: "Real Estate",
    id: "9",
    name: "Urban Reflection",
    image: image9,
    creator: "Sophia Anderson",
    description:
      "A nostalgic NFT collection evoking memories of childhood and innocence. Each artwork encapsulates a moment of joy and wonder, inviting viewers to reconnect with their inner child and find solace in the beauty of simple things.",
  },
  {
    category: "Gaming",
    id: "10",
    name: "Neon Serenity",
    image: image10,
    creator: "Alex Rodriguez",
    description:
      "A vibrant and energetic NFT series capturing the spirit category of urban life. With bold strokes and vivid colors, the artist brings street art to the digital realm, celebrating the raw energy and creativity of the city streets.",
  },
  {
    category: "Music",
    id: "11",
    name: "Mystic Sunrise",
    image: image11,
    creator: "Emily Davis",
    description:
      "An ethereal NFT collection inspired by dreams and the subconscious mind. Each artwork portrays a surreal landscape filled with otherworldly creatures and hidden meanings, inviting viewers to explore the boundaries of reality.",
  },
  {
    category: "Domain Names",
    id: "12",
    name: "Celestial Waters",
    image: image12,
    creator: "Jane Smith",
    description:
      "An abstract NFT creation that merges geometric shapes and organic forms in a harmonious dance. This artwork represents the artist's exploration of the interplay between chaos and order, inviting viewers to contemplate the mysteries of existence.",
  },
  {
    category: "Art",
    id: "13",
    name: "Enchanted Forest",
    image: image13,
    creator: "Sophie Walker",
    description:
      "A surreal NFT collection that blurs the line between reality and fantasy. Each artwork combines unexpected elements and dreamlike imagery, inviting viewers to question the nature of perception and explore the realms of the subconscious.",
  },
  {
    category: "Collectibles",
    id: "14",
    name: "Galactic Voyager",
    image: image14,
    creator: "Ethan Hughes",
    description:
      "A time-inspired NFT series that explores the concept of temporality. Through abstract visuals and fragmented narratives, the artist examines the passage of time and its impact on human experiences, prompting viewers to contemplate the fleeting nature of existence.",
  },
  {
    category: "Real Estate",
    id: "15",
    name: "Dreamscape Journey",
    image: image15,
    creator: "Ava Bennett",
    description:
      "An emotive NFT collection expressing the depths of human emotions. Through evocative colors and expressive brushstrokes, each artwork captures the essence of joy, sadness, love, and more, resonating with viewers on a deeply personal level.",
  },
];

const nftsData: NFT[] = partialNFTsData.map((item) => {
  item.endTime = generateRandomTimeDifference();
  item.price = generateRandomNFTPrice();
  return item as NFT;
});

export { nftsData };
