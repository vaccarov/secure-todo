import { AUTH_STORAGE_KEY } from '@/lib/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (storedAuth !== null) {
          setIsAuthenticated(JSON.parse(storedAuth));
        }
      } catch (error) {
        console.error('Failed to load auth state from storage', error);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    loadAuthState();
  }, []);

  // Save authenticated state to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoadingAuth) {
      const saveAuthState = async () => {
        try {
          await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isAuthenticated));
        } catch (error) {
          console.error('Failed to save auth state to storage', error);
        }
      };
      saveAuthState();
    }
  }, [isAuthenticated, isLoadingAuth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
