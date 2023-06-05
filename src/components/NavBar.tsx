import { Spin as Hamburger } from "hamburger-react";
import { ConnectWallet } from "@thirdweb-dev/react";


const NavBar = () => {
  return (
    <nav className="flex items-center justify-between text-white mb-12">
      <a href="/" className="text-3xl flex items-center gap-1">
        <img src="/logo.png" className="w-6 h-6" alt="" />
        <p className="font-ttramillas">Creative<span className="text-primary">art</span></p>
      </a>
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
        <Hamburger />
      </div>
    </nav>
  );

  // return (
  //   <div className="navbar">
  //     <div className="navbar-start">
  //       <details className="dropdown">
  //         <summary tabIndex={0} className="btn-ghost btn md:hidden">
  //           <Hamburger />
  //         </summary>
  //         <ul
  //           tabIndex={0}
  //           className="dropdown-content menu rounded-box menu-lg mt-3 w-96 bg-base-100 p-2 shadow"
  //         >
  //           <li>
  //             <a>Item 1</a>
  //           </li>
  //           <li>
  //             <a>Item 2</a>
  //           </li>
  //           <li>
  //             <a>Item 3</a>
  //           </li>
  //         </ul>
  //       </details>
  //       <a className="btn-ghost btn text-xl normal-case">DaisyUi</a>
  //     </div>
  //     <div className="navbar-center hidden md:flex">
  //       <ul className="hidden list-none items-center gap-8 md:flex">
  //          <li className="border-b-2 border-primary">Marketplace</li>
  //          <li>Artists</li>
  //          <li>Community</li>
  //         <li>Collections</li>
  //       </ul>
  //     </div>
  //     <div className="navbar-end">
  //       <ConnectWallet
  //         theme="light"
  //         dropdownPosition={{
  //           align: "center",
  //           side: "bottom",
  //         }}
  //       />
  //     </div>
  //   </div>
  // );
};

export default NavBar;
