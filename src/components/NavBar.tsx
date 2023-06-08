import Link from "next/link";
import Image from "next/image";
import {useRouter} from 'next/router'
import { useState } from "react";
import logo from '../../public/logo.png'
import { Spin as Hamburger } from "hamburger-react";
import { motion } from "framer-motion"
import { ConnectButton } from "@rainbow-me/rainbowkit";



const NavBar = () => {
  const routePath = useRouter().pathname
  const activeLink = "border-b-2 border-primary"
  return (
    <nav className="flex items-center justify-between text-white">
      <Link href="/" className="flex items-center gap-1 text-3xl">
        <Image src={logo} className="h-6 w-6" alt="Creative logo" />
        <p className="logo-text">
          Creative<span className="text-primary">art</span>
        </p>
      </Link>
      <ul className="hidden list-none items-center gap-8 lg:flex">
        <Link href="/"><li className={routePath === "/" ? activeLink : ""}>
          Home
        </li></Link>
        <Link href="/mint"><li className={routePath === "/mint" ? activeLink : ""}>
          Mint
        </li></Link>
        <Link href="/explore"><li className={routePath === "/explore" ? activeLink : ""}>
          Explore
        </li></Link>
      </ul>
      <div className="hidden lg:block">
        <ConnectButton />
      </div>

      <MobileMenu />
    </nav>
  );
};
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-50%" },
}

function MobileMenu() {
       const [isOpen, setIsOpen] = useState<boolean>(false);
       const routePath = useRouter().pathname
  const activeMobileLink = "bg-primary text-gray-900 opacity-[80%]"

  return (
    <>
      <div className="lg:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className={`dropdown_menu absolute right-2 top-[60px] z-[12] grid w-full max-w-[300px] gap-1 overflow-hidden  rounded-lg bg-gray-400/50 px-2 py-2 text-lg opacity-0 backdrop-blur-sm transition-[height] duration-[.2s] sm:right-4 `}
      >
        <Link href="/"><li
          className={`flex items-center justify-center rounded-lg
py-2 text-gray-200 hover:bg-[#1a1b1f] hover:text-white ${
            routePath === "/" ? activeMobileLink : ""
          }`}
        >
          Home
        </li></Link>
       <Link href="/mint"> <li
          className={`flex items-center justify-center rounded-lg
py-2 text-gray-200 hover:bg-[#1a1b1f] hover:text-white ${
            routePath === "/mint" ? activeMobileLink : ""
          }`}
        >Mint
        </li></Link>
        <Link href="/explore">
          {" "}
          <li
            className={`flex items-center justify-center rounded-lg
py-2 text-gray-200 hover:bg-[#1a1b1f] hover:text-white ${
              routePath === "/explore" ? activeMobileLink : ""
            }`}
          >
            Explore
          </li>
        </Link>
        <hr className="mx-auto w-4/5" />
        <div className="mt-4 grid justify-center py-2">
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            showBalance={{
              smallScreen: true,
              largeScreen: true,
            }}
            chainStatus={{
              smallScreen: "icon",
            }}
          />
        </div>
      </motion.div>
    </>
  );
}

export default NavBar;
