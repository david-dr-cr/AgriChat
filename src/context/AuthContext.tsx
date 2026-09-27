import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getToken,
  getUser,
  saveToken,
  saveUser,
  clearAuth,
} from '../services/authStorage';

type User = {
  id?: number;
  nom_complet: string;
  email: string;
  telephone?: string;
  role: 'agriculteur' | 'expert' | 'administrateur';
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedToken = await getToken();
        const savedUser = await getUser();

        setToken(savedToken);
        setUser(savedUser);
      } catch (error) {
        console.error(
          'Erreur récupération authentification :',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = async (
    newToken: string,
    newUser: User
  ) => {
    await saveToken(newToken);
    await saveUser(newUser);

    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    await clearAuth();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth doit être utilisé dans AuthProvider'
    );
  }

  return context;
};