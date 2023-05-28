import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// setting up a new configration for the opneai api
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // let x, y, z, codeSplit;

  if (req.method === "GET") {
    const { values } = req.query;

    const splitCode = values.split("~");

    const currentLangg = splitCode[0].slice(1, -1);
    const langToConvertt = splitCode[1].slice(1, -1);
    const actualCodeToConvert = splitCode[2].slice(1, -1);

    const resssss = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert the given piece of code from ${currentLangg} into ${langToConvertt}: ${actualCodeToConvert}`,
      temperature: 0,
      max_tokens: 150,
    });

    const openAiResponse = resssss.data;
    // console.log(resssss.data);

    res.status(200).json({
      currentLangg,
      langToConvertt,
      actualCodeToConvert,
      openAiResponse,
    });

    // const splitCode = values.split("~");
    // const currentLangg = splitCode[0].slice(1, -1);
    // const langToConvertt = splitCode[1].slice(1, -1);
    // const actualCodeToConvert = splitCode[2].slice(1, -1);

    // console.log("oiiiiiii: ", splitCode);

    // const resssss = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Convert the given piece of code from ${currentLangg} into ${langToConvertt}: ${actualCodeToConvert}`,
    //   temperature: 0,
    //   max_tokens: 150,
    // });

    // const filteredResponseValues = resssss.data;

    // res.status(200).json({
    //   values,
    //   splitCode,
    //   currentLangg,
    //   langToConvertt,
    //   actualCodeToConvert,
    //   filteredResponseValues,
    // });
  }
}
