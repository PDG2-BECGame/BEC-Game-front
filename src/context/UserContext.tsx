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
  isLoading: boolean; // Indicador de carga
  updateLevelScore: (level: number, score: number) => void; // Función para actualizar puntaje por nivel
  updateUserScore: (points: number) => void; // Función para actualizar puntaje total
  resetUserScore: () => void; // Función para reiniciar puntajes
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { currentUser, userData } = useContext(AuthContext)!; // Usa AuthContext para datos básicos
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga

  // Sincronizamos los datos del usuario al cambiar `userData` o `currentUser`
  useEffect(() => {
    if (userData) {
      setUser(userData); // Sincroniza los datos del usuario desde Firestore
      setIsLoading(false);
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

  // Actualiza el puntaje de un nivel específico
  const updateLevelScore = (level: number, score: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser; // Si no hay usuario, no hacemos nada

      const previousScore = prevUser.levelScores[level] || 0;
      const newScore = Math.max(score, previousScore); // Solo actualiza si el puntaje es mayor
      return {
        ...prevUser,
        totalScore: prevUser.totalScore + (newScore - previousScore),
        levelScores: {
          ...prevUser.levelScores,
          [level]: newScore,
        },
      };
    });
  };

  // Actualiza el puntaje total del usuario
  const updateUserScore = (points: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser; // Si no hay usuario, no hacemos nada
      return {
        ...prevUser,
        totalScore: prevUser.totalScore + points,
      };
    });
  };

  // Reinicia los puntajes del usuario
  const resetUserScore = () => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser; // Si no hay usuario, no hacemos nada
      return {
        ...prevUser,
        totalScore: 0,
        levelScores: {}, // Reiniciamos los puntajes por nivel
      };
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        updateLevelScore,
        updateUserScore,
        resetUserScore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};