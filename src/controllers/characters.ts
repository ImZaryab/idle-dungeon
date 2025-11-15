import { useMutation, useQuery } from "@tanstack/react-query";
import { Character } from "../types";

const BASE_URL = `${import.meta.env.VITE_SERVER_ENDPOINT}/character`;

export function useGetCharacters(userId?: string) {
  return useQuery({
    queryKey: userId ? [`${userId}-Characters`] : [],
    queryFn: async (): Promise<Array<Character>> => {
      if (!userId) return [];
      const res = await fetch(`${BASE_URL}/boundCharacters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const charactersResponse = await res.json();
      return charactersResponse;
    },
    enabled: !!userId,
  });
}

export function useSendCharacterOnQuest() {
  return useMutation({
    mutationFn: async (data: {
      characterId?: number;
      locationId?: number;
      questId?: number;
    }) => {
      const res = await fetch(`${BASE_URL}/sendOnQuest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send character on quest");
      return await res.json();
    },
    onSuccess: (data) => {
      // Optional: handle success (e.g., invalidate queries to refetch)
      console.log("Character sent on quest:", data);
    },
    onError: (error) => {
      // Optional: handle error
      console.error("Failed to send character on quest:", error);
    },
  });
}

export function useCompleteQuest() {
  return useMutation({
    mutationFn: async (data: { characterId?: number }) => {
      const res = await fetch(`${BASE_URL}/completeQuest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to complete quest");
      return await res.json();
    },
    onSuccess: (data) => {
      // Optional: handle success (e.g., invalidate queries to refetch)
      console.log("Quest completed:", data);
    },
    onError: (error) => {
      // Optional: handle error
      console.error("Failed to complete quest:", error);
    },
  });
}
