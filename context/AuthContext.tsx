import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { validateRegister, validateLogin } from '@/utils/validation';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const firebaseErrorMessages: Record<string, string> = {
    'auth/invalid-credential': 'Невірні дані авторизації',
  };

  // Регистрация в приложение
  const register = async (name: string, email: string, password: string) => {
    try {
      await validateRegister(name, email, password);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = userCredential?.user;

      await updateProfile(newUser, { displayName: name });

      setUser({ ...newUser, displayName: name });
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Вход в приложение
  const login = async (email: string, password: string) => {
    try {
      await validateLogin(email, password);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userCredential.user);
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Выход из приложения
  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  //Забыли пароль
  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: unknown) => {
    if (error instanceof FirebaseError) {
      const localizedMessage =
        firebaseErrorMessages[error.code] || 'Сталася невідома помилка!';
      throw new Error(localizedMessage);
    } else if (error instanceof Error) {
      throw error;
    } else {
      console.error('Невідома помилка', error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    register,
    login,
    logout,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
