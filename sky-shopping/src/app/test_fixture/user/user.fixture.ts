import { User } from 'src/app/shared/types/user';

export const userList: User[] = [];

export const registerUser = {
  firstName: 'test',
  lastName: 'test',
  middleName: 'test',
  email: 'test@gmail.com',
  phoneNumber: '+91-7865432312',
  password: 'test123',
};

export const newUser = {
  id: 'T1',
  firstName: 'test',
  lastName: 'test',
  middleName: 'test',
  email: 'test@gmail.com',
  phoneNumber: '+91-7865432312',
  password: 'test123',
  createAt: new Date(),
  updatedAt: new Date(),
};
