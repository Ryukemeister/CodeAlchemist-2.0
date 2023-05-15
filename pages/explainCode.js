import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useStore } from "@/store";
import Editor from "@/components/Editor";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });

function ExplainCode() {
  const codeToBeExplained = useStore((state) => state.codeToBeExplained);
  const setCodeToBeExplained = useStore((state) => state.setCodeToBeExplained);
  const codeReadyToBeExplained = useStore(
    (state) => state.codeReadyToBeExplained
  );
  const setCodeReadyToBeExplained = useStore(
    (state) => state.setCodeReadyToBeExplained
  );

  const handleClick = async (inputPrompt) => {
    setCodeReadyToBeExplained([]);
    try {
      const response = await fetch(`/api/explainCode/${inputPrompt}`);
      const data = await response.json();
      const { filteredResponse } = data;
      const codeToBeDisplayed = filteredResponse.choices[0].text
        .trimStart()
        .trimEnd();

      const splitDisplayedCode = codeToBeDisplayed.split(". ");

      setCodeReadyToBeExplained(splitDisplayedCode);
      speak(codeToBeDisplayed);
    } catch (error) {
      console.log(error);
    }
  };

  // This the part where all the code snippet explanation is displayed to the user
  const codeSnippetExplanation = (
    <div>
      <h1
        className={`${poppins.className} mx-5 mb-1 md:mx-10 font-semibold text-2xl`}
      >
        {`Here's`} what the below code snippet does: <br />
      </h1>
      <span className={`${poppins.className} text-xl bg-yellow-500 text-black`}>
        {codeReadyToBeExplained.map((piece, i) => {
          return (
            <p className={`${poppins.className} text-xl px-5 md:px-10`} key={i}>
              {i + 1}. {piece} <br />
            </p>
          );
        })}
      </span>
    </div>
  );

  // speech utterance specs
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Setting up the pitch tone and rate
    utterance.pitch = 1;
    utterance.rate = 0.8;
    utterance.voice = voices[7];
    utterance.volume = 2;

    window.speechSynthesis.speak(utterance);
  }

  return (
    <main>
      <Navbar />
      <div>
        <h1
          className={`${poppins.className} text-3xl font-semibold pl-5 md:px-10 py-5`}
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">
            {" "}
            Explanation Land
          </span>
          , this is where you get all the explanations about your code snippet.
        </h1>

        {codeReadyToBeExplained.length > 0 && (
          <div className="pb-5">{codeSnippetExplanation}</div>
        )}
        <div className="overflow-hidden ml-5 mr-5 md:ml-10 lg:w-[850px]">
          <div className="w-[100%] mr-5 md:mr-0">
            <Editor
              height="320"
              marginTop="0"
              marginLeft="0"
              code={codeToBeExplained}
              handleChange={setCodeToBeExplained}
              isEditable="true"
            />
          </div>
          <div>
            <button
              onClick={() => handleClick(codeToBeExplained)}
              className="bg-yellow-500 outline-none mt-4 mb-4 px-3 py-1 text-xl font-poppins font-semibold tracking-wide text-white rounded-md"
            >
              Expalin code
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ExplainCode;
