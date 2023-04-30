import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });

function ConvertCode() {
  const [inputValue, setInputValue] = useState("");
  const [content, setContent] = useState("");

  function onChange(e) {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  }

  async function onSubmitButton(e) {
    e.preventDefault();
    console.log("Button clicked");
    const response = await fetch(`/api/convertCode/${inputValue}`);
    const data = await response.json();
    const { filteredReponse } = data;

    console.log(data);
    console.log(filteredReponse.content);
    console.log(typeof filteredReponse.content);
    setContent(filteredReponse.content);
  }

  return (
    <main>
      <Navbar />
      <div>
        <h1
          className={`${inter.className} text-red-500 m-5 text-4xl font-bold`}
        >
          This is where all the code conversion happens!
        </h1>
      </div>
      <div className="my-5 mx-10">
        <h1
          className={`${inter.className} bg-white text-3xl text-red-400 font-bold`}
        >
          Hello world, this is{" "}
          <span
            className={`${poppins.className} pl-5 md:pl-0 bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text font-bold text-[28px]`}
          >
            CodeAlchemist
          </span>
        </h1>
        <input
          value={inputValue}
          onChange={onChange}
          className="bg-pink-400 m-5 rounded-full text-white px-3 py-1"
        ></input>
        <button
          onClick={onSubmitButton}
          className={`${inter.className} bg-green-400 rounded-md px-3 py-1 text-white font-bold`}
        >
          Click me
        </button>
        <h1 className={`${inter.className} font-medium text-2xl text-red-500`}>
          {content}
        </h1>
      </div>
    </main>
  );
}

export default ConvertCode;
