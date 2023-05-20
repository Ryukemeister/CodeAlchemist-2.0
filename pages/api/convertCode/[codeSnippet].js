import { Configuration, OpenAIApi } from "openai";
import { Bard } from "googlebard";

// Secret cookie for using the bard chatbot
let bardAuthCookie = process.env.BARD_AUTH_COOKIE;

// setring up bard config
let bot = new Bard(bardAuthCookie);

export default async function handler(req, res) {
  const { codeSnippet } = req.query;

  // Splitting incoming codeSnippet to get currentLang
  // langToConvert and actual code
  const splitCodeSnippet = codeSnippet.split("=+x=");
  const currentLanguage = splitCodeSnippet[0];
  const languageToConvert = splitCodeSnippet[1];
  const actualCode = splitCodeSnippet[2];

  if (req.method === "GET") {
    console.log(currentLanguage, languageToConvert);
    console.log(actualCode);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // setting up a new configration for the opneai api
    const openai = new OpenAIApi(configuration);

    // Calling the api and assigning the system the desired role
    // in order to get a response that can be as close to our expectation
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are a helpful assistant",
    //     },
    //     {
    //       role: "user",
    //       content: `Translate the following piece of code from ${currentLanguage} to ${languageToConvert} without suggesting any notes: "${actualCode}"`,
    //     },
    //   ],
    // });

    // console.log(actualCode, typeof actualCode);
    // console.log(
    //   currentLanguage,
    //   typeof currentLanguage,
    //   languageToConvert,
    //   typeof languageToConvert
    // );

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `##### Translate this piece of code from ${currentLanguage} into ${languageToConvert}\n ### ${currentLanguage}\n    \n    ${actualCode}\n    \n###${languageToConvert}`,
    //   temperature: 0,
    //   max_tokens: 150,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    //   stop: ["###"],
    // });

    // Example prompt: convert this code from python to java
    //  `Read, analyze and go through this code: ${actualCode} and then translate it from ${currentLanguage} into ${languageToConvert} and just return the code without any extra comments or explantion`
    // ` Translate this function from ${
    //   currentLanguage[0].toLocaleUpperCase() + currentLanguage.slice(1)
    // } into ${
    //   languageToConvert[0].toLocaleUpperCase() + languageToConvert.slice(1)
    // }:\n ${actualCode}`

    let responseFromBard = await bot.ask(`
    Translate the following ${currentLanguage} code to ${languageToConvert}: \n\n${actualCode}`);

    // let responseFromBard = await bot.ask(`How are you bard?`);

    // const filteredReponse = response.data.choices[0].message;
    // const filteredReponse = response.data;

    res
      .status(200)
      .json({
        splitCodeSnippet,
        currentLanguage,
        languageToConvert,
        actualCode,
      });
  }
}
