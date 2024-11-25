import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext'; // Importa el AuthContext

interface LevelScores {
  [level: number]: number;
}

interface User {
  name: string;
  email: string;
  organization: string;
  totalScore: number;
  levelScores: LevelScores;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean; // Agregamos un indicador de carga
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { currentUser, userData } = useContext(AuthContext)!; // Usa AuthContext para datos básicos
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga

  useEffect(() => {
    if (userData) {
      setUser(userData); // Sincroniza los datos del usuario
      setIsLoading(false); // Finaliza la carga
    } else if (currentUser) {
      // Usuario autenticado pero sin datos en Firestore
      setUser({
        name: currentUser.displayName || 'Usuario',
        email: currentUser.email || '',
        organization: '',
        totalScore: 0,
        levelScores: {}, // Inicializamos como objeto vacío
      });
      setIsLoading(false);
    } else {
      setIsLoading(true); // Datos aún no disponibles
      setUser(null);
    }
  }, [userData, currentUser]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
