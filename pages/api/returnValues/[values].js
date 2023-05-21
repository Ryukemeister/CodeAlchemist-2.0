export default function handler(req, res) {
  // let x, y, z, codeSplit;

  if (req.method === "GET") {
    const { values } = req.query;
    const splitCode = values.split("+");
    const x = splitCode[0];
    const y = splitCode[1];
    const z = splitCode[2];

    res.status(200).json({ splitCode, x, y, z, values });
  }
}
