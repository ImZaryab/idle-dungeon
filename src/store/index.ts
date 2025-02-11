import { create } from "zustand";
import { IUser } from "./types";

type Store = {
  authUser: IUser | null;
  requestLoading: boolean;
  setAuthUser: (user: IUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  getUser: () => IUser | null;
  reset: () => void;
};

const useStore = create<Store>((set, get) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  getUser: () => {
    return get().authUser;
  },
  reset: () => {
    set({
      authUser: null,
      requestLoading: false,
    });
  },
}));

export default useStore;
