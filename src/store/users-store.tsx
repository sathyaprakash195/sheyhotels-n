import { UserType } from "@/interfaces";
import { create } from "zustand";

const usersGlobalStore = create((set) => ({
  loggedInUserData: null,
  SetLoggedInUserData: (data: any) => set({ loggedInUserData: data }),
}));

export default usersGlobalStore;

export interface UsersGlobalStoreType {
  loggedInUserData: UserType | null;
  SetLoggedInUserData: (data: UserType) => void;
}
