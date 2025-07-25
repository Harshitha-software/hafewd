import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Login from '../Login';

// Mock the API calls
jest.mock('../../services/api', () => ({
  authAPI: {
    login: jest.fn(),
    register: jest.fn(),
    forgotPassword: jest.fn(),
    forgotUsername: jest.fn(),
  },
}));

// Mock the auth utils
jest.mock('../../utils/auth', () => ({
  setAuthToken: jest.fn(),
  setUserData: jest.fn(),
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form by default', () => {
    renderLogin();
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('displays demo credentials', () => {
    renderLogin();
    
    expect(screen.getByText('Demo Credentials:')).toBeInTheDocument();
    expect(screen.getByText('Username: demo')).toBeInTheDocument();
    expect(screen.getByText('Password: password')).toBeInTheDocument();
  });

  test('switches to register form when create account is clicked', () => {
    renderLogin();
    
    fireEvent.click(screen.getByText('Create Account'));
    
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('switches to forgot password form', () => {
    renderLogin();
    
    fireEvent.click(screen.getByText('Forgot Password?'));
    
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address and we\'ll send you instructions to reset your password.')).toBeInTheDocument();
  });

  test('switches to forgot username form', () => {
    renderLogin();
    
    fireEvent.click(screen.getByText('Forgot Username?'));
    
    expect(screen.getByText('Recover Username')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address and we\'ll send you your username.')).toBeInTheDocument();
  });

  test('validates required fields in login form', async () => {
    renderLogin();
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Form should not submit without required fields
    expect(screen.getByLabelText('Username')).toBeRequired();
    expect(screen.getByLabelText('Password')).toBeRequired();
  });

  test('handles login form submission', async () => {
    const mockLogin = require('../../services/api').authAPI.login;
    mockLogin.mockResolvedValue({
      token: 'test-token',
      user: { id: '1', username: 'testuser', email: 'test@test.com' }
    });

    renderLogin();
    
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password'
      });
    });
  });

  test('displays error message on login failure', async () => {
    const mockLogin = require('../../services/api').authAPI.login;
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    renderLogin();
    
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('handles register form submission', async () => {
    const mockRegister = require('../../services/api').authAPI.register;
    mockRegister.mockResolvedValue({
      token: 'test-token',
      user: { id: '1', username: 'newuser', email: 'new@test.com' }
    });

    renderLogin();
    
    // Switch to register form
    fireEvent.click(screen.getByText('Create Account'));
    
    // Fill out form
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Username/), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        username: 'newuser',
        email: 'new@test.com',
        password: 'password123'
      });
    });
  });
});