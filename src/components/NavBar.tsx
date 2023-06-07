import { Spin as Hamburger } from "hamburger-react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import logo from '../../public/logo.png'
import { useState } from "react";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggledClass = isOpen ? "" : "open"
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
      <div className="lg:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>
      <div className={`dropdown_menu absolute right-8 top-[60px] z-10 w-[300px] overflow-hidden rounded-lg bg-gray-400/50 backdrop-blur-sm ${toggledClass} py-2 transition-[height] duration-[.2s] `}>
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
        <div className="mt-4 text-center py-2 ">
          <ConnectWallet
            className=""
            theme="light"
            dropdownPosition={{
              align: "center",
              side: "bottom",
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
