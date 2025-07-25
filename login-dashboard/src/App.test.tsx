import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the auth utils
jest.mock('./utils/auth', () => ({
  isAuthenticated: jest.fn(() => false),
  getUserData: jest.fn(() => null),
}));

// Mock the API services
jest.mock('./services/api', () => ({
  authAPI: {
    login: jest.fn(),
    register: jest.fn(),
    forgotPassword: jest.fn(),
    forgotUsername: jest.fn(),
  },
  dataAPI: {
    getProjects: jest.fn(),
    getLeaderboard: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

test('renders login page when not authenticated', () => {
  render(<App />);
  
  // Since user is not authenticated, should show login page
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Secure Login Portal')).toBeInTheDocument();
});
