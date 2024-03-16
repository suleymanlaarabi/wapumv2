import { User } from "./User";

export default class WapumClient {
  private readonly user: User;

  constructor(private readonly BACKEND_URL = "http://localhost:3000") {
    this.BACKEND_URL = BACKEND_URL;
    this.user = new User(this.BACKEND_URL);
  }

  public signIn = async (username: string, password: string) => {};
}
