import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// Interfaz para los datos adicionales del usuario
interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Interfaz para los puntajes por nivel
interface LevelStatus {
  [level: string]: { score: number; maxScore: number };
}

// Interfaz para la estructura del usuario
interface User {
  name: string;
  email: string;
  organitationId: string | null; // ID de la organización
  organizationName: string | null; // Nombre de la organización
  totalScore: number; // Puntaje total calculado
  levelScores: LevelStatus; // Puntajes por nivel
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        console.log('Usuario autenticado:', user.uid);

        try {
          // Obtener el documento del usuario desde Firestore
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('Datos del usuario desde Firestore:', userData);

            let organizationName: string | null = null;

            // Verificar si el usuario tiene un organitationId
            if (userData.organitationId) {
              console.log('ID de organización encontrado:', userData.organitationId);

              try {
                const orgDocRef = doc(firestore, 'organitations', userData.organitationId);
                const orgDoc = await getDoc(orgDocRef);

                if (orgDoc.exists()) {
                  organizationName = orgDoc.data()?.name || null;
                  console.log('Organización encontrada:', organizationName);
                } else {
                  console.warn('No se encontró una organización para el ID:', userData.organitationId);
                }
              } catch (orgError) {
                console.error('Error al obtener la organización desde Firestore:', orgError);
              }
            } else {
              console.warn('El usuario no tiene un organitationId.');
            }

            // Calcular puntaje global dinámicamente
            const levelStatus = userData.levelStatus || {};
            let totalScore = 0;

            const levelScores: LevelStatus = Object.entries(levelStatus).reduce(
              (acc, [level, data]: any) => {
                const score = data?.score || 0;
                const maxScore = data?.maxScore || 0;
                totalScore += score;
                acc[level] = { score, maxScore };
                return acc;
              },
              {} as LevelStatus
            );

            // Actualizar los datos del usuario
            setUserData({
              name: userData.name || 'Usuario',
              email: userData.email || '',
              organitationId: userData.organitationId || null,
              organizationName: organizationName || 'Sin organización',
              totalScore,
              levelScores,
            });
          } else {
            console.warn('El usuario no tiene un documento en Firestore.');
            setUserData(null);
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
          setUserData(null);
        }
      } else {
        console.log('No hay un usuario autenticado.');
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
};