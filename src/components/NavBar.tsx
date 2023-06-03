import { Spin as Hamburger } from "hamburger-react";
import { ConnectWallet } from "@thirdweb-dev/react";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between text-white">
      <div className="text-3xl">
        Creative<span className="text-primary">art</span>
      </div>
      <ul className="hidden list-none items-center gap-8 lg:flex">
        <li className="border-b-2 border-primary">Marketplace</li>
        <li>Artists</li>
        <li>Community</li>
        <li>Collections</li>
      </ul>
    <div className="hidden lg:block">
      <ConnectWallet
      theme="dark"
      dropdownPosition={{
        align: "center",
        side: "bottom",
      }}
      />
      </div>
      <div className="lg:hidden">
        <Hamburger />
      </div>
    </nav>
  );
};

export default NavBar;
