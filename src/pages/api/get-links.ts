import { NextApiRequest, NextApiResponse } from "next";
import { getSupabase } from "../../utils/supabase";
import { off } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMethod = req.method;
  if (reqMethod === "POST") {
    const { offset, limit, userId, filterText, asc } = req.body;
    const { supabase } = getSupabase(userId);
    if (limit > 0) {
      const { data, error } = await supabase
        .from("link")
        .select()
        .order("created_at", {
          ascending: asc,
        })
        .eq("user_id", userId)
        .range(offset, limit);
      if (error) return res.status(500).json(error);
      res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from("link")
        .select()
        .order("created_at", {
          ascending: asc,
        })
        .eq("user_id", userId)
        .ilike("title", `%${filterText}%`);
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    }
  } else {
    return res
      .status(400)
      .json({ message: `HTTP method ${reqMethod} is not allowed` });
  }
}
