import { User } from '../users/global';

export type AuthPayload = {
  userId: string;
  username: string;
};

export interface RegisterBody extends User {
  password: string;
}
