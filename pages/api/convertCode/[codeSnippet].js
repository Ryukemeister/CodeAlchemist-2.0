import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { codeSnippet } = req.query;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const configuration = new Configuration({
      apiKey: openaiApiKey,
    });

    // setting up a new configration for the opneai api
    const openai = new OpenAIApi(configuration);

    // calling the api and assigning the system the desired role
    // in order to get a response that can be as close to our expectation
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a code converter that that translates code from one programming language into another with precision without giving any notes",
        },
        {
          role: "user",
          content: `Translate the following piece of code from javascript to python without suggesting any notes: "{${codeSnippet}}"`,
        },
      ],
    });

    const filteredReponse = response.data.choices[0].message;

    res.status(200).json({ filteredReponse });
  }
}
