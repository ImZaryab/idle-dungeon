import { useQuery } from "@tanstack/react-query";
import { LocationQuest } from "../types";

const BASE_URL = `${import.meta.env.VITE_SERVER_ENDPOINT}/quest`;

export function useGetLocationQuests(locationId: number | undefined) {
  return useQuery({
    queryKey: locationId ? [`Location-${locationId}-Quests`] : [],
    queryFn: async (): Promise<Array<LocationQuest>> => {
      if (!locationId) return [];
      const res = await fetch(`${BASE_URL}/${locationId}`, { method: "GET" });
      const locationQuestRes = await res.json();
      return locationQuestRes;
    },
    enabled: !!locationId //only runs when locationId is a truthy value
  });
}
