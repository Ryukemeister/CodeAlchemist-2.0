import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { codeSnippet } = req.query;

    // Splitting incoming codeSnippet to get currentLang
    // langToConvert and actual code
    const splitCodeSnippet = codeSnippet.split("=+x=");
    const currentLanguage = splitCodeSnippet[0];
    const languageToConvert = splitCodeSnippet[1];
    const actualCode = splitCodeSnippet[2];

    // Getting api key
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const configuration = new Configuration({
      apiKey: openaiApiKey,
    });

    // setting up a new configration for the opneai api
    const openai = new OpenAIApi(configuration);

    // Calling the api and assigning the system the desired role
    // in order to get a response that can be as close to our expectation
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant",
        },
        {
          role: "user",
          content: `Translate the following piece of code from ${currentLanguage} to ${languageToConvert} without suggesting any notes: "${actualCode}"`,
        },
      ],
    });

    const filteredReponse = response.data.choices[0].message;

    res.status(200).json({ filteredReponse });
  }
}
