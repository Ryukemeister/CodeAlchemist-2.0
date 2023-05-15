import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function ExplainCode() {
  const [inputVaue, setInputValue] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/explainCode/${inputVaue}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Navbar />
      <div>
        <h1
          className={`${inter.className} text-red-500 m-5 text-4xl font-bold`}
        >
          This is where all the code explanation happens
        </h1>
        <input
          className="border-2 border-red-500 px-2 mx-5"
          value={inputVaue}
          onChange={(e) => {
            setInputValue(e.currentTarget.value);
          }}
        ></input>
        <button
          onClick={handleClick}
          className="bg-yellow-500 px-2 py-1 rounded-sm text-white"
        >
          Click me
        </button>
      </div>
    </main>
  );
}

export default ExplainCode;
