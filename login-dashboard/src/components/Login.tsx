import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { setAuthToken, setUserData } from '../utils/auth';
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ForgotUsernameData,
} from '../types';
import './Login.css';

type FormMode = 'login' | 'register' | 'forgotPassword' | 'forgotUsername';

const Login: React.FC = () => {
  const [mode, setMode] = useState<FormMode>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [forgotPasswordForm, setForgotPasswordForm] =
    useState<ForgotPasswordData>({
      email: '',
    });

  const [forgotUsernameForm, setForgotUsernameForm] =
    useState<ForgotUsernameData>({
      email: '',
    });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(loginForm);
      setAuthToken(response.token);
      setUserData(response.user);
      login(response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register(registerForm);
      setAuthToken(response.token);
      setUserData(response.user);
      login(response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.forgotPassword(forgotPasswordForm);
      setMessage(response.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send reset email'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.forgotUsername(forgotUsernameForm);
      setMessage(response.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send username reminder'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setError('');
    setMessage('');
    setLoginForm({ username: '', password: '' });
    setRegisterForm({
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
    setForgotPasswordForm({ email: '' });
    setForgotUsernameForm({ email: '' });
  };

  const switchMode = (newMode: FormMode) => {
    setMode(newMode);
    resetForms();
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Welcome Back</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={loginForm.username}
          onChange={(e) =>
            setLoginForm({ ...loginForm, username: e.target.value })
          }
          required
          placeholder="Enter your username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
          required
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      <div className="auth-links">
        <button
          type="button"
          onClick={() => switchMode('forgotPassword')}
          className="link-button"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={() => switchMode('forgotUsername')}
          className="link-button"
        >
          Forgot Username?
        </button>
      </div>
      <div className="auth-switch">
        <p>Don't have an account?</p>
        <button
          type="button"
          onClick={() => switchMode('register')}
          className="link-button"
        >
          Create Account
        </button>
      </div>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Create Account</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={registerForm.firstName}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, firstName: e.target.value })
            }
            required
            placeholder="First name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={registerForm.lastName}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, lastName: e.target.value })
            }
            required
            placeholder="Last name"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="reg-username">Username</label>
        <input
          type="text"
          id="reg-username"
          value={registerForm.username}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, username: e.target.value })
          }
          required
          placeholder="Choose a username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.target.value })
          }
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="reg-password">Password</label>
        <input
          type="password"
          id="reg-password"
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
          required
          placeholder="Create a password"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      <div className="auth-switch">
        <p>Already have an account?</p>
        <button
          type="button"
          onClick={() => switchMode('login')}
          className="link-button"
        >
          Sign In
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="auth-form">
      <h2>Reset Password</h2>
      <p className="form-description">
        Enter your email address and we'll send you instructions to reset your
        password.
      </p>
      <div className="form-group">
        <label htmlFor="forgot-email">Email</label>
        <input
          type="email"
          id="forgot-email"
          value={forgotPasswordForm.email}
          onChange={(e) => setForgotPasswordForm({ email: e.target.value })}
          required
          placeholder="Enter your email"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Sending...' : 'Send Reset Instructions'}
      </button>
      <div className="auth-switch">
        <button
          type="button"
          onClick={() => switchMode('login')}
          className="link-button"
        >
          Back to Sign In
        </button>
      </div>
    </form>
  );

  const renderForgotUsernameForm = () => (
    <form onSubmit={handleForgotUsername} className="auth-form">
      <h2>Recover Username</h2>
      <p className="form-description">
        Enter your email address and we'll send you your username.
      </p>
      <div className="form-group">
        <label htmlFor="username-email">Email</label>
        <input
          type="email"
          id="username-email"
          value={forgotUsernameForm.email}
          onChange={(e) => setForgotUsernameForm({ email: e.target.value })}
          required
          placeholder="Enter your email"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Sending...' : 'Send Username Reminder'}
      </button>
      <div className="auth-switch">
        <button
          type="button"
          onClick={() => switchMode('login')}
          className="link-button"
        >
          Back to Sign In
        </button>
      </div>
    </form>
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Dashboard</h1>
          <p>Secure Login Portal</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        {mode === 'login' && renderLoginForm()}
        {mode === 'register' && renderRegisterForm()}
        {mode === 'forgotPassword' && renderForgotPasswordForm()}
        {mode === 'forgotUsername' && renderForgotUsernameForm()}

        <div className="demo-credentials">
          <p>
            <strong>Demo Credentials:</strong>
          </p>
          <p>Username: demo</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
