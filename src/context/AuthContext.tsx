import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'manager';
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Set default headers for all axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // For demonstration, we'll simulate fetching user data
        // In a real app, you would make an API call to get user info
        const simulatedUserData = JSON.parse(localStorage.getItem('userData') || 'null');
        if (simulatedUserData) {
          setUser(simulatedUserData);
        }
        
        setLoading(false);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setUser(null);
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to login
      // For this MVP, we'll simulate authentication
      if (email === 'admin@example.com' && password === 'password') {
        const simulatedUser = {
          _id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin' as const,
        };
        const simulatedToken = 'simulated-jwt-token-for-admin';
        
        localStorage.setItem('token', simulatedToken);
        localStorage.setItem('userData', JSON.stringify(simulatedUser));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${simulatedToken}`;
        setUser(simulatedUser);
        navigate('/dashboard');
      } else if (email === 'manager@example.com' && password === 'password') {
        const simulatedUser = {
          _id: '2',
          name: 'Manager User',
          email: 'manager@example.com',
          role: 'manager' as const,
          department: 'Engineering',
        };
        const simulatedToken = 'simulated-jwt-token-for-manager';
        
        localStorage.setItem('token', simulatedToken);
        localStorage.setItem('userData', JSON.stringify(simulatedUser));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${simulatedToken}`;
        setUser(simulatedUser);
        navigate('/dashboard');
      } else if (email === 'employee@example.com' && password === 'password') {
        const simulatedUser = {
          _id: '3',
          name: 'Employee User',
          email: 'employee@example.com',
          role: 'employee' as const,
          department: 'Engineering',
          position: 'Developer',
        };
        const simulatedToken = 'simulated-jwt-token-for-employee';
        
        localStorage.setItem('token', simulatedToken);
        localStorage.setItem('userData', JSON.stringify(simulatedUser));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${simulatedToken}`;
        setUser(simulatedUser);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};