import Cookies from 'js-cookie';
import { User } from '../types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};

export const setUserData = (user: User): void => {
  Cookies.set(USER_KEY, JSON.stringify(user), {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  });
};

export const getUserData = (): User | null => {
  const userData = Cookies.get(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const removeUserData = (): void => {
  Cookies.remove(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const logout = (): void => {
  removeAuthToken();
  removeUserData();
};
