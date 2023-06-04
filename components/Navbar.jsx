import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Sidebar from "./Sidebar";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });

function Navbar() {
  function displaySidebar() {
    const hamburgerMenu = document.querySelector(".hamburger-navigation");
    hamburgerMenu.classList.remove("translate-x-[-100%]");
  }

  function hideSidebar() {
    const hamburgerMenu = document.querySelector(".hamburger-navigation");
    hamburgerMenu.classList.add("translate-x-[-100%]");
  }

  return (
    <nav className="flex bg-black text-white h-[15vh] md:h-[12vh] items-center justify-between overflow-hidden">
      <div className="md:pl-10">
        <Sidebar handleClick={hideSidebar} />
        <Link href="/">
          <h1
            className={`${poppins.className} pl-5 md:pl-0 bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text font-bold text-[28px]`}
          >
            CodeAlchemist
          </h1>
        </Link>
      </div>
      <div className="block md:hidden">
        <button onClick={displaySidebar}>
          <Image
            src="/Hamburger_Icon.jpg"
            className="mr-5"
            width="50"
            height="40"
            alt="Hamburger icon"
          />
        </button>
      </div>
      <div className="hidden md:block pr-10">
        <ul className="flex gap-x-14">
          <li>
            <Link href="/convertCode">
              <h1
                className={`${poppins.className} text-white font-poppins text-xl hover:text-red-400`}
              >
                Convert code
              </h1>
            </Link>
          </li>
          <li>
            <Link href="/explainCode">
              <h1
                className={`${poppins.className} text-white font-poppins text-xl hover:text-red-400`}
              >
                Explain code
              </h1>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <h1
                className={`${poppins.className} text-white font-poppins text-xl hover:text-red-400`}
              >
                About
              </h1>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
