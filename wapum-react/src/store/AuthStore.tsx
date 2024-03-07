import { StoreApi, UseBoundStore, create } from "zustand";
import {
  getAuthenticatedUser,
  loginAuthApi,
  registerAuthApi,
} from "../services/api/auth-api";
import { CreateUserForm, LoginUserForm } from "../wapum-types/auth/Form";
import { User } from "../wapum-types/users/global";

interface AuthStore {
  user: User | null;
  updateCurrentUserProfilePicture: (file: File) => Promise<void>;
  register: (userForm: CreateUserForm) => Promise<void>;
  login: (loginForm: LoginUserForm) => Promise<void>;
  logout: () => void;
  init: () => void;
}

function getUserInLocalStorage() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export const useAuthStore: UseBoundStore<StoreApi<AuthStore>> = create(
  (set) => ({
    user: getUserInLocalStorage(),

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

    updateCurrentUserProfilePicture: async (file: File) => {
      set((state) => {
        if (!state.user) return state;
        return {
          ...state,
          user: { ...state.user, avatar: URL.createObjectURL(file) },
        };
      });
    },

    init: async () => {
      if (!localStorage.getItem("access_token")) return;
      try {
        const user = await getAuthenticatedUser();
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          set({
            user,
          });
          return;
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
  })
);

// init
