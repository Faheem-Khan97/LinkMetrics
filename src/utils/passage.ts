import Passage from "@passageidentity/passage-node";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID!,
  apiKey: process.env.PASSAGE_API_KEY!,
});

export const getAuthenticatedUserFromSession = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      return { isAuthorized: true, userID: userID };
    }
  } catch (error) {
    // authentication failed
    return { isAuthorized: false, userID: "" };
  }
};
