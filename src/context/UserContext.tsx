import React, { createContext, useState, ReactNode } from 'react';

// Definimos la interfaz para el usuario
interface User {
  name: string;
  email: string;
  organization: string;
  totalScore: number;
}

// Definimos el tipo para el contexto del usuario
interface UserContextType {
  user: User;
  updateUserScore: (points: number) => void;
  resetUserScore: () => void;
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
  });

  // Función para actualizar el puntaje del usuario
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
    }));
  };

  // Aquí puedes agregar efectos secundarios o lógica adicional
  // por ejemplo, para guardar el estado en localStorage o interactuar con una API

  // Valor que será compartido por el contexto
  const value: UserContextType = {
    user,
    updateUserScore,
    resetUserScore,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};