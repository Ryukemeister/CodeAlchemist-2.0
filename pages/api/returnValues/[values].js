export default function handler(req, res) {
  // let x, y, z, codeSplit;

  if (req.method === "GET") {
    const { values } = req.query;
    const splitCode = values.split(" ");
    const currentLangg = splitCode[0].slice(1, -1);
    const langToConvertt = splitCode[1].slice(1, -1);
    const actualCodeToConvert = splitCode[2];

    res.status(200).json({
      values,
      splitCode,
      currentLangg,
      langToConvertt,
      actualCodeToConvert,
    });
  }
}
