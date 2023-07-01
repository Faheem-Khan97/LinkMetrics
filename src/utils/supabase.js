import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const getSupabase = (userId) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const options = {};
  let token = "";

  if (userId) {
    const payload = {
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    token = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET);
    options.global = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, options);

  return { supabase, token };
};

export { getSupabase };
