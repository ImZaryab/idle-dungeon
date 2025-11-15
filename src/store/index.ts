import { create } from "zustand";
import { IUser } from "./types";

/**
 * Global store for Clerk authentication session data only.
 * Backend user data (characters, gold, etc.) managed via React Query.
 */
type Store = {
  authUser: IUser | null;
  setAuthUser: (user: IUser | null) => void;
  reset: () => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  setAuthUser: (user) => set({ authUser: user }),
  reset: () => set({ authUser: null }),
}));

export default useStore;
