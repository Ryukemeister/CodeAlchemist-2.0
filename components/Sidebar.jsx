import Link from "next/link";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

function Sidebar({ handleClick }) {
  return (
    <div className="flex flex-col hamburger-navigation fixed w-[100vw] h-[100vh] translate-x-[-100%] transition-all ease-in-out duration-500 bg-black z-50 md:hidden">
      <div className="justify-center w-[100%] h-[95%]">
        <button className="fixed w-[100%]" onClick={handleClick}>
          <Image
            src="/Cross_Icon.jpg"
            width="50"
            height="50"
            className="float-right mr-5"
            alt="Cross icon"
          />
        </button>
        <ul className="flex justify-center items-center h-[100%] flex-col gap-x-0 gap-y-14">
          <li>
            <Link href="/">
              <h1
                className={`text-white ${bebasNeue.className} font-semibold tracking-wider text-4xl text-center`}
              >
                Home
              </h1>
            </Link>
          </li>
          <li>
            <Link href="/convertCode">
              <h1
                className={`text-white ${bebasNeue.className} font-semibold tracking-wider text-4xl text-center`}
              >
                Convert code
              </h1>
            </Link>
          </li>
          <li>
            <Link href="/explainCode">
              <h1
                className={`text-white ${bebasNeue.className} font-semibold tracking-wider text-4xl text-center`}
              >
                Explain code
              </h1>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <h1
                className={`text-white ${bebasNeue.className} font-semibold tracking-wider text-4xl text-center`}
              >
                About
              </h1>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
