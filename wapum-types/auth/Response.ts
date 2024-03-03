export interface RegisterResponse {
  access_token: string;
  data: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    phone: string;
    avatar: string;
  };
}

export interface LoginResponse {
  access_token: string;
  data: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    phone: string;
    avatar: string;
  };
}
