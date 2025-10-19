import { useQuery } from "@tanstack/react-query";
import { userDataReq } from "../types";

const BASE_URL = `${import.meta.env.VITE_SERVER_ENDPOINT}/user`;

export function useGetUserData(user: userDataReq | undefined) {
  return useQuery({
    queryKey: user && user.id ? [`${user.name}-UserData`] : [],
    queryFn: async () => {
      if (!user?.id) return {};
      const res = await fetch(`${BASE_URL}/verify-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          provider: user.provider,
          isVerified: user.isVerified,
        })
      });
      const userData = await res.json();
      return userData;
    },
    enabled: !!user
  });
}
