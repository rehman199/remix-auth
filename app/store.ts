import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "./interfaces/user";

interface IAuthState {
  user: IUser | null;
  accessToken: string;
  refreshToken: string;
}

interface IAuthSlice {
  auth: IAuthState;
  loginUser: (userData: IAuthState) => void;
  logoutUser: () => void;
}

const createAuthSlice: StateCreator<
  IAuthSlice,
  [],
  [["zustand/devtools", never], ["zustand/persist", IAuthSlice]],
  IAuthSlice
> = devtools(
  persist(
    (set) => ({
      auth: { user: null, accessToken: "", refreshToken: "" },
      loginUser: (userData: IAuthState) => set(() => ({ auth: userData })),
      logoutUser: () =>
        set(() => ({
          auth: { user: null, accessToken: "", refreshToken: "" },
        })),
    }),
    { name: "authStore" }
  )
);

const useStore = create<IAuthSlice>()((...a) => ({ ...createAuthSlice(...a) }));

export default useStore;
