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
    "javascript",
    "typeScript",
    "python",
    "java",
    "c",
    "c++",
    "sql",
    "swift",
    "ruby",
    "go",
    "flutter",
    "dart",
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

    const response = await fetch(
      `/api/convertCode/${currentLang}=+x=${langToConvert}=+x=${codeToBeConverted}`
    );
    const data = await response.json();
    const {
      filteredReponse,
      responseFromBard,
      currentLanguage,
      languageToConvert,
    } = data;
    const actualConvertedCodeSnippet = filteredReponse.choices[0].text
      .trimStart()
      .trimEnd();

    console.log(filteredReponse);
    console.log(actualConvertedCodeSnippet);
    console.log(
      currentLanguage[0].toLocaleUpperCase() + currentLanguage.slice(1),
      languageToConvert[0].toLocaleUpperCase() + languageToConvert.slice(1)
    );

    console.log(responseFromBard);

    setConvertedCode(actualConvertedCodeSnippet);
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
