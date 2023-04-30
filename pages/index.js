import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Editor from "@/components/Editor";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="overflow-hidden justify-center md:justify-start flex flex-col md:flex-row h-[85vh] md:h-[88vh]">
        <div className="flex flex-col md:mt-0 md:justify-center">
          <h1
            className={`${poppins.className} w-[350px] md:w-[570px] font-semibold text-[68px] md:text-[80px] ml-5 md:ml-10 mb-5 leading-[105%]`}
          >
            Turning code into clarity.
          </h1>
          <h1
            className={`${poppins.className} font-poppins font-medium w-[350px] md:w-[465px] text-[28px] md:text-[36px] ml-5 md:ml-10 leading-[130%]`}
          >
            Where coding wizards come to craft their spells.
          </h1>
          <button
            className={`${poppins.className} w-[230px] md:w-[220px] bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent font-semibold px-4 py-[8px] md:py-[6px] rounded-md text-2xl ml-5 mt-5 md:ml-10`}
          >
            <Link href="/about">
              <h1 className="text-white">Know more</h1>
            </Link>
          </button>
        </div>
        <div className="hidden md:flex justify-center translate-x-[60px] items-center">
          <Editor
            width="850"
            height="400"
            marginLeft="0"
            marginTop="0"
            isEditable="false"
          />
        </div>
      </div>
    </main>
  );
}
