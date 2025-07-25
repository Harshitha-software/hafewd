export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  score?: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ForgotUsernameData {
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  rank: number;
}
