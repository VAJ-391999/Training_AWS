import { Role, UserTokenPayload } from 'src/app/shared/types/auth';

export const authUser: UserTokenPayload = {
  id: 'u1',
  email: 'test@gmail.com',
  role: Role.USER,
};
