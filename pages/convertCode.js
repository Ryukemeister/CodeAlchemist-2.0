import { useStore } from "@/store";
import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Editor from "@/components/Editor";

const inter = Inter({ subsets: ["latin"] });
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
    "C",
    "C++",
    "Sql",
    "Swift",
    "Ruby",
    "Go",
    "Flutter",
    "Dart",
  ];

  async function onSubmitButton(e) {
    e.preventDefault();
    setConvertedCode("");

    // Obtaining values of the current language options and
    // the language to be converted
    const currentLang = document.getElementById("current-language").value;
    const langToConvert = document.getElementById(
      "language-to-be-converted"
    ).value;

    console.log("Current language is: ", currentLang);
    console.log("Language to convert is: ", langToConvert);

    const response = await fetch(
      `/api/convertCode/(${currentLang})~(${langToConvert})~(${codeToBeConverted})`
    );
    const data = await response.json();
    const {
      splitCodeSnippet,
      currentLanguage,
      languageToConvert,
      actualCode,
      responseFromBard,
    } = data;
    // const actualConvertedCodeSnippet = filteredReponse.choices[0].text
    //   .trimStart()
    //   .trimEnd();

    // console.log(filteredReponse);
    // console.log(actualConvertedCodeSnippet);
    const res = await fetch(
      `/api/returnValues/(${currentLang})~(${langToConvert})~(${codeToBeConverted})`
    );

    const resData = await res.json();
    const { values, splitCode, currentLangg, langToConvertt } = resData;

    console.log("----------");
    console.log("This is the actual response data: ", resData);
    console.log("These are the values", values);
    console.log("This is the split code", splitCode);
    console.log("Current language: ", currentLangg);
    console.log("Language to convert", langToConvertt);
    console.log("Given code: ", actualCodeToConvert);
    console.log("----------");

    console.log("1: ", splitCodeSnippet);
    console.log("2: ", currentLanguage);
    console.log("3: ", languageToConvert);
    console.log("4: ", actualCode);
    console.log(responseFromBard);

    // console.log(responseFromBard);

    // setConvertedCode(actualConvertedCodeSnippet);
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
        onClick={onSubmitButton}
      >
        Submit
      </button>
    </main>
  );
}

export default ConvertCode;
