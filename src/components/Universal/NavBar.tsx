import { motion } from "framer-motion";
import { Spin as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
import logo from "/public/icons/logo.png";
import useCurrentUser from "~/hooks/useCurrentUser";

const NavBar = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const routePath = useRouter().pathname;
  const activeLink = "border-b-2 border-primary hover:border-white";



  const changeBackground = () => {

    if (window.scrollY >= 90) {
      setIsScrolling(true);
      return;
    }
    setIsScrolling(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, [window.scrollY]);


  return (
    <nav
      className={`px-2 md:px-4 sticky top-[10px] text-xl z-[20] flex py-1 md:py-2 items-center justify-between text-white
        ${isScrolling ? "rounded-full top-[.5rem] opacity-[90%] backdrop-blur-md shadow-sm shadow-primary" : ""}`}
    >
      <Link href="/" className="flex items-center gap-1 text-3xl">
        <Image src={logo} className="h-6 w-6" alt="Creative logo" />
        <p className="logo-text">
          Creative<span className="text-primary">art</span>
        </p>
      </Link>
      <ul className="hidden list-none items-center gap-8 lg:flex">
        <Link href="/">
          <li className={`${routePath === "/" ? activeLink : ""} hover:text-primary `}>Home</li>
        </Link>
        <Link href="/explore">
          <li className={`${routePath === "/explore" ? activeLink : ""} hover:text-primary`}>
            Explore
          </li>
        </Link>
        <Link href="/mint">
          <li className={`${routePath === "/mint" ? activeLink : ""} hover:text-primary`}>Mint</li>
        </Link>
      </ul>
      <div className="hidden lg:block">
        <AuthButton />
      </div>

      <MobileMenu />
    </nav>
  );
};
const variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    opacity: 0,
    scale: 0,
    transition: { when: "afterChildren" },
  },
};

const oneVariants = {
  open: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.3 } },
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      delay: 0.4,
      duration: 0.3,
    },
  },
};
const twoVariants = {
  open: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.3 } },
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
};

const threeVariants = {
  open: { opacity: 1, x: 0, transtion: { delay: 0.2, duration: 0.3 } },
  closed: {
    opacity: 0,
    x: "-100%",
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};
const fourVariants = {
  open: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } },
  closed: {
    opacity: 0,
    y: "100%",
    transition: {
      delay: 0.1,
      duration: 0.3,
    },
  },
};

function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openState, setOpenState] = useState('')
  const routePath = useRouter().pathname;
  const activeMobileLink = "border-primary border-y-2";

useEffect(() => {
  if(openState === 'closed'){
    setOpenState('open')
    return
  }
  setOpenState('closed')

}, [isOpen])

  return (
    <>
      <div className="lg:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>
      <motion.div
        initial={false}
        animate={openState}
        variants={variants}
        className={`dropdown_menu absolute right-0  top-[calc(100%+5px)] z-[12] grid w-full max-w-[300px] gap-1 overflow-hidden rounded-lg  bg-gray-400/60 backdrop-blur-sm px-2 py-2 text-lg sm:right-4 lg:hidden `}
      >
        <Link href="/">
          <motion.li
            variants={oneVariants}
            className={`flex items-center justify-center rounded-lg
py-2 text-gray-200 hover:bg-[#1a1b1f] hover:text-white ${
              routePath === "/" ? activeMobileLink : ""
            }`}
          >
            Home
          </motion.li>
        </Link>
            <Link href="/explore">
              {" "}
              <motion.li
                variants={threeVariants}
                className={`flex items-center justify-center rounded-lg
    py-2 text-gray-200 hover:bg-[#1a1b1f] hover:text-white ${
                  routePath === "/explore" ? activeMobileLink : ""
                }`}
              >
                Explore
              </motion.li>
            </Link>
        <Link href="/mint">
          {" "}
          <motion.li
            variants={twoVariants}
            className={`flex items-center justify-center rounded-lg
py-2 text-gray-200 hover:bg-[#1a1b1f] hover:text-white ${
              routePath === "/mint" ? activeMobileLink : ""
            }`}
          >
            Mint
          </motion.li>
        </Link>
        <hr className="mx-auto w-4/5" />
        <motion.div
          variants={fourVariants}
          className="mt-4 grid justify-center py-2"
        >
          {/* <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          /> */}
          <AuthButton />
        </motion.div>
      </motion.div>
    </>
  );
}

export default NavBar;
