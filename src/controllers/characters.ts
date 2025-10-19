import { useQuery } from "@tanstack/react-query";
import { Character } from "../types";

const BASE_URL = `${import.meta.env.VITE_SERVER_ENDPOINT}/character`;

export function useGetCharacters(userId: string | undefined) {
  return useQuery({
    queryKey: userId ? [`${userId}-Characters`] : [],
    queryFn: async (): Promise<Array<Character>> => {
      if (!userId) return [];
      const res = await fetch(`${BASE_URL}/boundCharacters`, {
        method: "POST",
        body: JSON.stringify({ userId })
      });
      const charactersResponse = await res.json();
      return charactersResponse;
    },
    enabled: !!userId
  });
}
