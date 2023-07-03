import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMethod = req.method;
  if (reqMethod === "POST") {
    const { id } = req.body;
    try {
      const newdata = await axios.get(
        `https://api.rebrandly.com/v1/links/${id}`,
        {
          headers: {
            apikey: process.env.REBRANDLY_API_TOKEN,
            Authorization: `Bearer ${process.env.REBRANDLY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json(newdata.data);
    } catch (error) {
      console.log({ error });
      if (error) return res.status(500).json(error);
    }
  } else {
    return res
      .status(400)
      .json({ message: `HTTP method ${reqMethod} is not allowed` });
  }
}
