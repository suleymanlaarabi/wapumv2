export interface CreateUserForm {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
}

export type LoginUserForm = {
  email: string;
  password: string;
};
