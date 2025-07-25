import axios from 'axios';
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ForgotUsernameData,
  User,
  Project,
  LeaderboardEntry,
} from '../types';
import { getAuthToken } from '../utils/auth';

// Mock API base URL - replace with actual API endpoint
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  username: 'demo',
  email: 'demo@example.com',
  firstName: 'Demo',
  lastName: 'User',
  score: 1250,
};

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website',
    description: 'Full-stack e-commerce platform with React and Node.js',
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'React Native mobile application for task management',
    status: 'completed',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
  },
  {
    id: '3',
    name: 'Data Analytics Dashboard',
    description: 'Business intelligence dashboard with real-time analytics',
    status: 'pending',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
  },
];

const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', username: 'alice_dev', score: 2850, rank: 1 },
  { id: '2', username: 'bob_coder', score: 2340, rank: 2 },
  { id: '3', username: 'charlie_tech', score: 1890, rank: 3 },
  { id: '4', username: 'demo', score: 1250, rank: 4 },
  { id: '5', username: 'eve_programmer', score: 980, rank: 5 },
];

export const authAPI = {
  login: async (
    credentials: LoginCredentials
  ): Promise<{ token: string; user: User }> => {
    // Mock login - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.username === 'demo' &&
          credentials.password === 'password'
        ) {
          resolve({
            token: 'mock-jwt-token-12345',
            user: mockUser,
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  register: async (
    data: RegisterData
  ): Promise<{ token: string; user: User }> => {
    // Mock registration - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          score: 0,
        };
        resolve({
          token: 'mock-jwt-token-new-user',
          user: newUser,
        });
      }, 1000);
    });
  },

  forgotPassword: async (
    data: ForgotPasswordData
  ): Promise<{ message: string }> => {
    // Mock forgot password - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Password reset instructions sent to your email',
        });
      }, 1000);
    });
  },

  forgotUsername: async (
    data: ForgotUsernameData
  ): Promise<{ message: string }> => {
    // Mock forgot username - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Username reminder sent to your email',
        });
      }, 1000);
    });
  },
};

export const dataAPI = {
  getProjects: async (): Promise<Project[]> => {
    // Mock API call - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjects);
      }, 500);
    });
  },

  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    // Mock API call - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockLeaderboard);
      }, 500);
    });
  },

  getCurrentUser: async (): Promise<User> => {
    // Mock API call - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUser);
      }, 500);
    });
  },
};
