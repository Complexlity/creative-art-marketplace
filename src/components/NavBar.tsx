import { Spin as Hamburger } from "hamburger-react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import logo from '../../public/logo.png'
import { useState } from "react";
import { motion } from "framer-motion"


const NavBar = () => {


  return (
    <nav className="flex items-center justify-between text-white">
      <Link href="/" className="flex items-center gap-1 text-3xl">
        <Image src={logo} className="h-6 w-6" alt="Creative logo" />
        <p className="logo-text">
          Creative<span className="text-primary">art</span>
        </p>
      </Link>
      <ul className="hidden list-none items-center gap-8 lg:flex">
        <li className="border-b-2 border-primary">Marketplace</li>
        <li>Artists</li>
        <li>Community</li>
        <li>Collections</li>
      </ul>
      <div className="hidden lg:block">
        <ConnectWallet
          className=""
          theme="light"
          dropdownPosition={{
            align: "center",
            side: "bottom",
          }}
        />
      </div>

      <MobileMenu  />
    </nav>
  );
};
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-50%" },
}

function MobileMenu() {
       const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="lg:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className={`dropdown_menu absolute sm:right-4 right-2 top-[60px] z-[12] w-full max-w-[300px] overflow-hidden rounded-lg bg-gray-400/50 py-2 backdrop-blur-sm transition-[height] duration-[.2s] `}
      >
        <li className="flex items-center justify-center py-2">
          <a href="">Home</a>
        </li>
        <li className="flex items-center justify-center py-2 ">
          <a href="">About</a>
        </li>
        <li className="flex items-center justify-center   py-2">
          <a href="">Services</a>
        </li>
        <li className="flex items-center justify-center  py-2 ">
          <a href="">Contact</a>
        </li>
        <hr className="mx-auto w-4/5" />
        <div className="mt-4 py-2 text-center ">
          <ConnectWallet
            className=""
            theme="light"
            dropdownPosition={{
              align: "center",
              side: "bottom",
            }}
          />
        </div>
      </motion.div>
    </>
  );
}

export default NavBar;
