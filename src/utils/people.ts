import { StaticImageData } from "next/dist/client/image";
import image1 from "../../public/people/1.webp";
import image2 from "../../public/people/18.webp";
import image3 from "../../public/people/3.webp";
import image4 from "../../public/people/4.webp";
import image5 from "../../public/people/19.webp";
import image6 from "../../public/people/6.webp";
import image7 from "../../public/people/7.webp";
import image8 from "../../public/people/8.webp";
import image9 from "../../public/people/9.webp";
import image10 from "../../public/people/10.webp";
import image11 from "../../public/people/11.webp";
import image12 from "../../public/people/12.webp";
import image13 from "../../public/people/13.webp";
import image14 from "../../public/people/14.webp";
import image15 from "../../public/people/15.webp";
import image16 from "../../public/people/16.webp";
import image17 from "../../public/people/17.webp";
import image18 from "../../public/people/17.webp";
import image19 from "../../public/people/20.webp";
import image20 from "../../public/people/20.webp";

type People = {
  name: string,
  image: StaticImageData
}

const people: People[] = [
  {
    name: "Sophia Anderson",
    image: image1
  },
  {
    name:"Ethan Hughes",
    image: image2
  },
{ name: "Ava Bennett",
  image: image3
},

{ name:"Max Johnson",
image: image4,
},

{ name: "Emma Wilson",
image: image5,
},

{ name: "Olivia Lee",
image: image6,
},

{ name: "Liam Thompson",
image: image7,
},

{ name: "Isabella Martinez",
image: image8,
},
{ name: "Noah Clark",
image: image9,
},
{ name: "Mia Baker",
image: image10,
},

{ name: "Benjamin Wright",
image: image11,
},
{ name: "Amelia Taylor",
image: image12,
},
{ name: "Oliver Rodriguez",
image: image13,
},

{ name: "Charlotte Davis",
image: image14,
},

{ name: "Elijah Green",
image: image15,
},
{ name: "Harper King",
image: image16,
},
{ name: "Alexander Evans",
image: image17,
},
{ name: "Emily Hernandez",
image: image18,
},
{ name: "James Foster",
image: image19,
},

{ name: "Grace Phillips",
image: image20,
},
]

export { people }
export type { People }