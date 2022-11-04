export interface UserTokenPayload {
  id: string;
  email: string;
  role: Role;
  [key: string]: any;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
