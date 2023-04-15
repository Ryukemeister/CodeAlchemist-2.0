import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div>
        <h1
          className={`${inter.className} bg-red-500 text-3xl text-white font-bold`}
        >
          Hello world!
        </h1>
      </div>
    </main>
  );
}
