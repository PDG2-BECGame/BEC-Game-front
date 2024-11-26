import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

interface LevelScore {
  score: number;
  maxScore: number;
}

interface LevelScores {
  [level: string]: LevelScore;
}

interface User {
  name: string;
  email: string;
  organitationId: string | null;
  organizationName: string | null;
  totalScore: number;
  levelScores: LevelScores;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  updateLevelScore: (level: string, score: number, maxScore: number) => void;
  resetUserScore: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { userData } = useContext(AuthContext) as {
    userData: User | null;
  };

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      console.log('UserData in UserContext:', userData);

      // Usar directamente userData.levelScores
      setUser({
        name: userData.name || 'Usuario',
        email: userData.email || '',
        organitationId: userData.organitationId || null,
        organizationName: userData.organizationName || 'Sin organización',
        totalScore: userData.totalScore || 0,
        levelScores: userData.levelScores || {}, // Tomamos directamente los datos ya procesados
      });

      setIsLoading(false);
    } else {
      console.warn('No userData available in UserContext.');
      setUser(null);
      setIsLoading(false);
    }
  }, [userData]);

  const updateLevelScore = (level: string, score: number, maxScore: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      const previousScore = prevUser.levelScores[level]?.score || 0;
      const newScore = Math.max(score, previousScore);

      return {
        ...prevUser,
        totalScore: prevUser.totalScore + (newScore - previousScore),
        levelScores: {
          ...prevUser.levelScores,
          [level]: { score: newScore, maxScore },
        },
      };
    });
  };

  const resetUserScore = () => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      return {
        ...prevUser,
        totalScore: 0,
        levelScores: Object.keys(prevUser.levelScores).reduce((acc, key) => {
          acc[key] = { score: 0, maxScore: prevUser.levelScores[key].maxScore };
          return acc;
        }, {} as LevelScores),
      };
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        updateLevelScore,
        resetUserScore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
