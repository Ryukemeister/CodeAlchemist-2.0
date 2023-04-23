import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

function About() {
  return (
    <main>
      <Navbar />
      <div>
        <h1
          className={`${inter.className} text-red-500 m-5 text-4xl font-bold`}
        >
          Welcome to the about page
        </h1>
      </div>
    </main>
  );
}

export default About;
