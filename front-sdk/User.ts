import type { LoginUserForm } from "../wapum-types/auth/Form";
import type { LoginResponse } from "../wapum-types/auth/Response";
import type { ApiError } from "../wapum-types/error/api";

export class User {
  private isAuth = false;
  private user = null;
  constructor(private readonly BACKEND_URL = "http://localhost:3000") {
    this.BACKEND_URL = BACKEND_URL;
  }

  public async signIn(loginUserForm: LoginUserForm) {
    const response = await fetch(this.BACKEND_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUserForm),
    });

    const data = await response.json();
    if (response.ok) {
      return data as LoginResponse;
      this.isAuth = true;
    }

    throw new Error((data as ApiError).message);
  }
}
