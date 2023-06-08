import image from "../../public/nft-1.jpg";
import { StaticImageData } from "next/dist/client/image";

type People = {
  name: string,
  image: StaticImageData
}

const people: People[] = [
  {
    name: "Sophia Anderson",
    image: image
  },
  {
    name:"Ethan Hughes",
    image: image
  },
{ name: "Ava Bennett",
  image: image
},

{ name:"Max Johnson",
image: image,
},

{ name: "Emma Wilson",
image: image,
},

{ name: "Olivia Lee",
image: image,
},

{ name: "Liam Thompson",
image: image,
},

{ name: "Isabella Martinez",
image: image,
},
{ name: "Noah Clark",
image: image,
},
{ name: "Mia Baker",
image: image,
},

{ name: "Benjamin Wright",
image: image,
},
{ name: "Amelia Taylor",
image: image,
},
{ name: "Oliver Rodriguez",
image: image,
},

{ name: "Charlotte Davis",
image: image,
},

{ name: "Elijah Green",
image: image,
},
{ name: "Harper King",
image: image,
},
{ name: "Alexander Evans",
image: image,
},
{ name: "Emily Hernandez",
image: image,
},
{ name: "James Foster",
image: image,
},

{ name: "Grace Phillips",
image: image,
},
]

export { people }
export type { People }