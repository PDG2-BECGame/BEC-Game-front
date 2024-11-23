import React, { createContext, useState, ReactNode } from 'react';

// Definimos la interfaz para los puntajes por nivel
interface LevelScores {
  [level: number]: number; // La clave es el número del nivel, el valor es el puntaje máximo obtenido
}

// Definimos la interfaz para el usuario
interface User {
  name: string;
  email: string;
  organization: string;
  totalScore: number;
  levelScores: LevelScores; // Nuevo campo para puntajes por nivel
}

// Definimos el tipo para el contexto del usuario
interface UserContextType {
  user: User;
  updateUserScore: (points: number) => void;
  resetUserScore: () => void;
  updateLevelScore: (level: number, score: number) => void; // Nueva función
}

// Creamos el contexto con un valor inicial nulo
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Definimos el tipo para las props del proveedor
interface UserProviderProps {
  children: ReactNode;
}

// Implementamos el proveedor del contexto
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Estado inicial del usuario
  const [user, setUser] = useState<User>({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    organization: 'Empresa XYZ',
    totalScore: 0,
    levelScores: {}, // Inicialmente vacío
  });

  // Función para actualizar el puntaje del usuario (opcional si ya no se usa)
  const updateUserScore = (points: number) => {
    setUser(prevUser => ({
      ...prevUser,
      totalScore: prevUser.totalScore + points,
    }));
  };

  // Función para reiniciar el puntaje del usuario
  const resetUserScore = () => {
    setUser(prevUser => ({
      ...prevUser,
      totalScore: 0,
      levelScores: {}, // Reiniciamos también los puntajes por nivel
    }));
  };

  // Función para actualizar el puntaje de un nivel
  const updateLevelScore = (level: number, score: number) => {
    setUser(prevUser => {
      const previousScore = prevUser.levelScores[level] || 0;
      const newLevelScore = Math.min(score, 500); // Aseguramos que no exceda 500
      const levelScoreDifference = newLevelScore - previousScore;

      if (levelScoreDifference > 0) {
        return {
          ...prevUser,
          totalScore: prevUser.totalScore + levelScoreDifference,
          levelScores: {
            ...prevUser.levelScores,
            [level]: newLevelScore,
          },
        };
      } else {
        // Si el nuevo puntaje no es mayor, no actualizamos el estado
        return prevUser;
      }
    });
  };

  // Valor que será compartido por el contexto
  const value: UserContextType = {
    user,
    updateUserScore,
    resetUserScore,
    updateLevelScore, // Añadimos la nueva función al contexto
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};