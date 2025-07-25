import {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  setUserData,
  getUserData,
  removeUserData,
  isAuthenticated,
  logout,
} from '../auth';
import { User } from '../../types';

// Mock js-cookie
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

describe('Auth Utils', () => {
  const mockUser: User = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    score: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Token Management', () => {
    test('setAuthToken should set token with correct options', () => {
      const mockSet = require('js-cookie').set;
      const token = 'test-token';

      setAuthToken(token);

      expect(mockSet).toHaveBeenCalledWith('auth_token', token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    });

    test('getAuthToken should return token', () => {
      const mockGet = require('js-cookie').get;
      const token = 'test-token';
      mockGet.mockReturnValue(token);

      const result = getAuthToken();

      expect(mockGet).toHaveBeenCalledWith('auth_token');
      expect(result).toBe(token);
    });

    test('removeAuthToken should remove token', () => {
      const mockRemove = require('js-cookie').remove;

      removeAuthToken();

      expect(mockRemove).toHaveBeenCalledWith('auth_token');
    });
  });

  describe('User Data Management', () => {
    test('setUserData should set user data with correct options', () => {
      const mockSet = require('js-cookie').set;

      setUserData(mockUser);

      expect(mockSet).toHaveBeenCalledWith('user_data', JSON.stringify(mockUser), {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    });

    test('getUserData should return parsed user data', () => {
      const mockGet = require('js-cookie').get;
      mockGet.mockReturnValue(JSON.stringify(mockUser));

      const result = getUserData();

      expect(mockGet).toHaveBeenCalledWith('user_data');
      expect(result).toEqual(mockUser);
    });

    test('getUserData should return null when no data exists', () => {
      const mockGet = require('js-cookie').get;
      mockGet.mockReturnValue(undefined);

      const result = getUserData();

      expect(result).toBeNull();
    });

    test('removeUserData should remove user data', () => {
      const mockRemove = require('js-cookie').remove;

      removeUserData();

      expect(mockRemove).toHaveBeenCalledWith('user_data');
    });
  });

  describe('Authentication Status', () => {
    test('isAuthenticated should return true when token exists', () => {
      const mockGet = require('js-cookie').get;
      mockGet.mockReturnValue('test-token');

      const result = isAuthenticated();

      expect(result).toBe(true);
    });

    test('isAuthenticated should return false when no token exists', () => {
      const mockGet = require('js-cookie').get;
      mockGet.mockReturnValue(undefined);

      const result = isAuthenticated();

      expect(result).toBe(false);
    });

    test('logout should remove both token and user data', () => {
      const mockRemove = require('js-cookie').remove;

      logout();

      expect(mockRemove).toHaveBeenCalledWith('auth_token');
      expect(mockRemove).toHaveBeenCalledWith('user_data');
    });
  });
});