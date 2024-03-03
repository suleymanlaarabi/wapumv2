import { CreateUserForm, LoginUserForm } from "../../wapum-types/auth/Form";
import {
  LoginResponse,
  RegisterResponse,
} from "../../wapum-types/auth/Response";
import { User } from "../../wapum-types/users/global";

import { BACKEND_API_URL } from "../../data/dev.variable";
import { ApiError } from "../../wapum-types/error/api";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const access_token: string | null = localStorage.getItem("access_token");
  options.headers = options.headers || new Headers();
  if (access_token && options.headers instanceof Headers) {
    options.headers.set("Authorization", `Bearer ${access_token}`);
  }

  return await fetch(url, options);
}

export const registerAuthApi = async (
  form: CreateUserForm
): Promise<RegisterResponse> => {
  const response = await fetch(BACKEND_API_URL + "auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = (await response.json()) as RegisterResponse | ApiError;

  if (response.ok) {
    return data as RegisterResponse;
  }
  throw new Error((data as ApiError).message);
};

export const getAuthenticatedUser = async (): Promise<User | null> => {
  if (!localStorage.getItem("access_token")) return null;
  const headers = new Headers();
  headers.set("content-type", "application/json");
  const response = await fetchWithAuth(BACKEND_API_URL + "users/me", {
    headers: headers,
  });

  const data = await response.json();

  if (response.ok) {
    return data as User;
  }
  throw new Error((data as ApiError).message);
};

export const loginAuthApi = async (
  loginUserForm: LoginUserForm
): Promise<LoginResponse> => {
  const response = await fetch(BACKEND_API_URL + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginUserForm),
  });

  const data = await response.json();
  if (response.ok) {
    return data as LoginResponse;
  }
  throw new Error((data as ApiError).message);
};
