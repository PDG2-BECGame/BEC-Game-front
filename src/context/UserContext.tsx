import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { firestore } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

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
  organitationId: string | null; // Usamos organitationId
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
  const { currentUser, userData } = useContext(AuthContext) as {
    currentUser: any;
    userData: {
      name: string;
      email: string;
      organitationId?: string; // Cambiado a organitationId
      levelStatus?: { [level: string]: { score: number; maxScore: number } };
    } | null;
  };
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (userData) {
        console.log('Datos completos del usuario:', userData);

        let organizationName = null;

        // Cambiado organizationId por organitationId
        if (userData.organitationId) {
          try {
            console.log('Buscando organización con ID:', userData.organitationId);
            const orgRef = doc(firestore, 'organitations', userData.organitationId); // Usamos organitationId aquí
            const orgDoc = await getDoc(orgRef);

            if (orgDoc.exists()) {
              organizationName = orgDoc.data()?.name || null;
              console.log('Organización encontrada:', organizationName);
            } else {
              console.log('No se encontró la organización con el ID:', userData.organitationId);
            }
          } catch (error) {
            console.error('Error al obtener la organización desde Firebase:', error);
          }
        }

        const levelStatus = userData.levelStatus || {};
        let totalScore = 0;

        const levelScores: LevelScores = Object.entries(levelStatus).reduce((acc, [level, data]: any) => {
          const score = data?.score || 0;
          const maxScore = data?.maxScore || 0;
          totalScore += score;
          acc[level] = { score, maxScore };
          return acc;
        }, {} as LevelScores);

        setUser({
          name: userData.name || 'Usuario',
          email: userData.email || '',
          organitationId: userData.organitationId || null, // Usamos organitationId aquí
          organizationName: organizationName || 'Sin organización',
          totalScore,
          levelScores,
        });
        setIsLoading(false);
      } else if (currentUser) {
        setUser({
          name: currentUser.displayName || 'Usuario',
          email: currentUser.email || '',
          organitationId: null,
          organizationName: 'Sin organización',
          totalScore: 0,
          levelScores: {},
        });
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setUser(null);
      }
    };

    loadUserData();
  }, [userData, currentUser]);

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
        levelScores: {},
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