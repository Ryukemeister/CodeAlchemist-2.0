import { Configuration, OpenAIApi } from "openai";
import { Bard } from "googlebard";

// Secret cookie for using the bard chatbot
let bardAuthCookie = process.env.BARD_AUTH_COOKIE;

// Setup bard config
let bot = new Bard(bardAuthCookie);

export default async function handler(req, res) {
  const { codeSnippet } = req.query;

  // Splitting incoming codeSnippet to get currentLang
  // langToConvert and actual code
  const splitCodeSnippet = codeSnippet.split("~");
  const currentLanguage = splitCodeSnippet[0].slice(1, -1);
  const languageToConvert = splitCodeSnippet[1].slice(1, -1);
  const actualCode = splitCodeSnippet[2].slice(1, -1);

  if (req.method === "GET") {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // setting up a new configration for the opneai api
    const openai = new OpenAIApi(configuration);

    let responseFromBard = await bot.ask(`
    Translate the following ${currentLanguage} code to ${languageToConvert}: \n\n${actualCode}`);

    res.status(200).json({
      responseFromBard,
    });
  }
}
