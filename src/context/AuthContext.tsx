import React, { createContext, useContext, useState } from 'react';
import { UserClass } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

interface AuthContextProps {
  user: UserClass | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (newUser: { name: string, lastname: string, email: string, password: string, repassword: string; }) => Promise<RegisterResponse>;
  isAuthenticated: boolean;
}

interface RegisterResponse {
  created: boolean;
  message: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [user, setUser] = useState<UserClass | null>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const loguedUser = await AuthService.login({ email, password });
      const userData = loguedUser.user;

      setUser(userData);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  const register = AuthService.register;

  const logout = async () => {
    try {
      await AuthService.logout();

      setUser(null);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
