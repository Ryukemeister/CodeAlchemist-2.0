import { useStore } from "@/store";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Editor from "@/components/Editor";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });

function ConvertCode() {
  const codeToBeConverted = useStore((store) => store.codeToBeConverted);
  const convertedCode = useStore((state) => state.convertedCode);
  const setCodeToBeConverted = useStore((store) => store.setCodeToBeConverted);
  const setConvertedCode = useStore((state) => state.setConvertedCode);
  const allAvailableLanguages = [
    "Javascript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C",
    "Regex",
    "Sql",
    "Swift",
    "Ruby",
    "Flutter",
    "Go",
    "Dart",
  ];

  async function onButtonClick(e) {
    e.preventDefault();

    const currentLang = document.getElementById("current-language").value;
    const langToConvert = document.getElementById(
      "language-to-be-converted"
    ).value;

    const errMessage = `// Oops, something's wrong :(

    const error = {
      causes:[
        "Either you haven't provided any input to the Editor",
        "Or the language that you're trying to convert your code into and the language that you're currently opting for in the Editor are both one and the same",
        "Or maybe you aren't connected to the internet"
      ], 
      possibleSolutions:[
        "Try providing a better prompt to the Editor",
        "Or check if the language that you write your code and the language you want to convert your code into are not the same",
        "Or try refreshing your browser"
      ],
    }; `;

    // Error handling
    // Try to check if the user provides a blank input to the Editor
    // Or the language to convert and current language are the same
    if (
      codeToBeConverted.length <= 0 ||
      currentLang == langToConvert ||
      codeToBeConverted == errMessage
    ) {
      setConvertedCode(errMessage);
      return;
    }

    setConvertedCode("Loading...");

    const response = await fetch(
      `/api/returnValues/(${currentLang})~(${langToConvert})~(${codeToBeConverted})`
    );
    const data = await response.json();
    const { openAiResponse } = data;

    const convertedResponse = openAiResponse.choices[0].text
      .trimStart()
      .trimEnd();

    setConvertedCode(convertedResponse);
  }

  return (
    <main>
      <Navbar />
      <h1
        className={`${poppins.className} text-3xl font-semibold px-5 md:px-10 pt-5 md:py-5`}
      >
        Welcome to{" "}
        <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">
          {" "}
          Conversion Land
        </span>
        , this is where you convert your code.
      </h1>
      <div className="overflow-hidden flex flex-col md:flex-row mx-5 gap-x-14 gap-y-10 md:ml-10 mt-5">
        <Editor
          code={codeToBeConverted}
          handleChange={setCodeToBeConverted}
          width="560"
          height="320"
          marginLeft="0"
          marginTop="0"
          isEditable="true"
          selectedLanguageBoxColor="green"
          availableLanguages={allAvailableLanguages}
          id="current-language"
        />
        <Editor
          width="560"
          height="320"
          marginTop="0"
          marginLeft="0"
          selectedLanguageBoxColor="yellow"
          isEditable="true"
          id="language-to-be-converted"
          availableLanguages={allAvailableLanguages}
          code={convertedCode}
          handleChange={setConvertedCode}
        />
      </div>
      <button
        className={`${poppins.className} bg-red-500 opacity-90 text-white font-poppins font-semibold text-xl px-3 py-1 rounded-md tracking-wide ml-5 md:ml-10 mb-5 mt-5`}
        onClick={onButtonClick}
      >
        Submit
      </button>
    </main>
  );
}

export default ConvertCode;
