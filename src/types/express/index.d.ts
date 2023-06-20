import { IUser } from '@features/users/models/user.model';

export {};

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}
