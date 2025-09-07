import { LocationQuest } from "../types";

const BASE_URL = `${import.meta.env.VITE_SERVER_ENDPOINT}/quest`;

export async function getQuests(locationId: number): Promise<LocationQuest[]> {
  const res = await fetch(`${BASE_URL}/${locationId}`, {
    method: "GET"
  })

  const locationQuestRes = await res.json();
  return locationQuestRes;
}
