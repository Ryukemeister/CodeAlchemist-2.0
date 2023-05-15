import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// setting up a new configration for the opneai api
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { codeSnippet } = req.query;

  console.log(codeSnippet);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Explain what the following code snippet does: ${codeSnippet}`,
    temperature: 0,
    max_tokens: 150,
  });

  //console.log(response);
  const filteredResponse = response.data;
  console.log(response.data);

  res.status(200).json({ filteredResponse });
}
