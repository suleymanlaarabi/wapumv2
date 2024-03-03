import { StoreApi, UseBoundStore, create } from "zustand";
import {
  getAuthenticatedUser,
  loginAuthApi,
  registerAuthApi,
} from "../services/api/auth-api";
import { CreateUserForm, LoginUserForm } from "../wapum-types/auth/Form";
import { User } from "../wapum-types/users/global";
import { useChatsStore } from "./ChatStore";

interface AuthStore {
  user: User | null;
  register: (userForm: CreateUserForm) => Promise<void>;
  login: (loginForm: LoginUserForm) => Promise<void>;
  logout: () => void;
  init: () => void;
}

export const useAuthStore: UseBoundStore<StoreApi<AuthStore>> = create(
  (set) => ({
    user: null,

    register: async (user) => {
      const response = await registerAuthApi(user);
      set({ user: response.data });
      localStorage.setItem("access_token", response.access_token);
    },

    login: async (loginForm: LoginUserForm) => {
      const response = await loginAuthApi(loginForm);
      set({ user: response.data });
      localStorage.setItem("access_token", response.access_token);
    },

    logout: () => {
      set({ user: null });
      localStorage.removeItem("access_token");
    },

    init: () => {
      if (!localStorage.getItem("access_token")) return;
      if (localStorage.getItem("user")) {
        set({ user: JSON.parse(localStorage.getItem("user")!) });
      }
      try {
        getAuthenticatedUser().then((user) => {
          if (user) {
            set({ user });
            localStorage.setItem("user", JSON.stringify(user));
          }
        });
      } catch (error) {
        console.log(error);
      }

      useChatsStore.getState().init();
    },
  })
);

// init
