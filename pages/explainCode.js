import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function ExplainCode() {
  return (
    <main>
      <div>
        <h1
          className={`${inter.className} text-red-500 m-5 text-4xl font-bold`}
        >
          This is where all the code explanation happens
        </h1>
      </div>
    </main>
  );
}

export default ExplainCode;
