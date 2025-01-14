import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  nickname: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (newUser: { nickname: string, email: string, password: string; }) => Promise<RegisterResponse>;
  isAuthenticated: boolean;
}

interface RegisterResponse {
  created: boolean;
  message: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string): Promise<User | null> => {
    try {

      const fetchUser = await fetch('https://task-manager-production-cf49.up.railway.app/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!fetchUser.ok) {
        const { message } = await fetchUser.json();
        throw new Error(`Error al iniciar sesión: ${message}`);
      }

      const response = await fetchUser.json();

      const { id, nickname, email: userEmail } = response.user;
      const { token } = response;

      const userData: User = { id, nickname, email: userEmail };
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', JSON.stringify(token));
      setUser(userData);

      return userData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      return null;
    }
  };

  const register = async ({ nickname, email, password }: { nickname: string, email: string, password: string; }): Promise<RegisterResponse> => {
    console.log('Usuario registrado:', { email, password, nickname });

    try {
      const fetchUser = await fetch('https://task-manager-production-cf49.up.railway.app/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, nickname }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await fetchUser.json();

      if (!fetchUser.ok) {
        throw new Error(`Error al crear el usuario: ${response.message}`);
      }

      return {
        created: true,
        message: 'Usuario creado correctamente'
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al crear el usuario:', error.response?.data || error.message);

      return {
        created: false,
        message: `Error al crear el usuario: ${error.response?.data || error.message}`
      };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
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
