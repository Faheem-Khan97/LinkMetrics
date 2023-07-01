import axios from "axios";

export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getLinks(
  userId: string,
  limit: number,
  filterText?: string,
  asc?: string
) {
  return axios.post(
    "/api/get-links",
    {
      userId,
      limit,
      offset: 0,
      filterText: filterText ?? "",
      asc: asc == "oldest",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
