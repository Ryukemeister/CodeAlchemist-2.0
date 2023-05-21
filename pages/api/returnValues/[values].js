export default function handler(req, res) {
  // let x, y, z, codeSplit;

  if (req.method === "GET") {
    const { values } = req.query;
    const splitCode = values.split(" ");
    const currentLanguage = splitCode[0].slice(1, -1);
    const languageToConvert = splitCode[1].slice(1, -1);
    const actualCode = splitCode[2].slice(1, -1);

    res.status(200).json({
      values,
      splitCode,
      currentLangg,
      langToConvertt,
      actualCodeToConvert,
    });
  }
}
