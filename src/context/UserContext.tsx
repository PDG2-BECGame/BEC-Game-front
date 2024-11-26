import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Importamos getDoc
import { firestore } from '../firebase/firebaseConfig';
import { User as FirebaseUser } from 'firebase/auth';

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
  maxTotalScore: number; // Agregado para el puntaje máximo total
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
    currentUser: FirebaseUser | null;
    userData: {
      name: string;
      email: string;
      organitationId?: string;
      organizationName?: string;
      levelScores?: LevelScores;
    } | null;
  };

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      // Calcular el totalScore y el maxTotalScore
      let totalScore = 0;
      let maxTotalScore = 0;

      const levelScores = userData.levelScores || {};
      for (const level in levelScores) {
        const { score, maxScore } = levelScores[level];
        totalScore += score;
        maxTotalScore += maxScore;
      }

      setUser({
        name: userData.name || 'Usuario',
        email: userData.email || '',
        organitationId: userData.organitationId || null,
        organizationName: userData.organizationName || 'Sin organización',
        totalScore,
        maxTotalScore, // Guardar el puntaje máximo total
        levelScores,
      });

      setIsLoading(false);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [userData]);

  const updateLevelScore = async (level: string, score: number, maxScore: number) => {
    if (!currentUser) {
      console.error('No user is currently authenticated.');
      return;
    }

    try {
      const userDocRef = doc(firestore, 'users', currentUser.uid);

      // Obtener el puntaje actual desde Firestore
      const userDocSnapshot = await getDoc(userDocRef);
      const currentFirestoreScore = userDocSnapshot.get(`levelStatus.${level}.score`) || 0;

      // Calcular el nuevo puntaje máximo
      const newScore = Math.max(score, currentFirestoreScore);

      // Actualizar en Firestore solo si el nuevo puntaje es mayor
      if (newScore > currentFirestoreScore) {
        await updateDoc(userDocRef, {
          [`levelStatus.${level}.score`]: newScore,
          [`levelStatus.${level}.maxScore`]: maxScore,
        });
      }

      // Actualizar el estado local
      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        const previousScore = prevUser.levelScores[level]?.score || 0;
        const finalScore = Math.max(score, previousScore);

        return {
          ...prevUser,
          totalScore: prevUser.totalScore + (finalScore - previousScore),
          levelScores: {
            ...prevUser.levelScores,
            [level]: { score: finalScore, maxScore },
          },
        };
      });
    } catch (error) {
      console.error('Error updating score in Firestore:', error);
    }
  };

  const resetUserScore = async () => {
    if (!currentUser) {
      console.error('No user is currently authenticated.');
      return;
    }

    try {
      // Resetear el estado local
      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        const resetLevelScores = Object.keys(prevUser.levelScores).reduce((acc, key) => {
          acc[key] = { score: 0, maxScore: prevUser.levelScores[key].maxScore };
          return acc;
        }, {} as LevelScores);

        return {
          ...prevUser,
          totalScore: 0,
          levelScores: resetLevelScores,
        };
      });

      // Resetear en Firestore
      const userDocRef = doc(firestore, 'users', currentUser.uid);

      // Crear un objeto con los campos a actualizar
      const resetLevelStatus = Object.keys(user?.levelScores || {}).reduce((acc, level) => {
        acc[`levelStatus.${level}.score`] = 0;
        return acc;
      }, {} as any);

      await updateDoc(userDocRef, resetLevelStatus);
    } catch (error) {
      console.error('Error resetting user scores in Firestore:', error);
    }
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