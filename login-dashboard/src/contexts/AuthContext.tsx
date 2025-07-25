import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User } from '../types';
import {
  getUserData,
  isAuthenticated,
  logout as authLogout,
} from '../utils/auth';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      if (isAuthenticated()) {
        const userData = getUserData();
        setUser(userData);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
