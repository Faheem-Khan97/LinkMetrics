import { NextApiRequest, NextApiResponse } from "next";
import { getSupabase } from "../../utils/supabase";
import axios from "axios";
import { headers } from "next/dist/client/components/headers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMethod = req.method;
  if (reqMethod === "POST") {
    const { title, userId, link } = req.body;
    const { supabase } = getSupabase(userId);
    try {
      const newdata = await axios.post(
        "https://api.rebrandly.com/v1/links",
        {
          destination: link,
          title,
        },
        {
          headers: {
            apikey: process.env.REBRANDLY_API_TOKEN,
            Authorization: `Bearer ${process.env.REBRANDLY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(newdata.data.shortUrl, "gfdfghjhgfdfghjhgf");
      const { data, error } = await supabase
        .from("link")
        .insert({
          title: title,
          user_id: userId,
          long_url: link,
          short_url: newdata.data.shortUrl,
        })
        .select()
        .single();
      const resp = {
        data: {
          inserted: data,
          shortedLink: newdata.data,
        },
      };
      return res.status(200).json(resp);
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
