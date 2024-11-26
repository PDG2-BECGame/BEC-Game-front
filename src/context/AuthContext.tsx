import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, onSnapshot, getDoc } from 'firebase/firestore'; // Importamos onSnapshot

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
    let unsubscribeUserDoc: () => void = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user); // Log para verificar si el usuario está autenticado
      setCurrentUser(user);

      if (user) {
        try {
          // Obtener la referencia al documento del usuario
          const userDocRef = doc(firestore, 'users', user.uid);

          // Establecer listener en tiempo real en el documento del usuario
          unsubscribeUserDoc = onSnapshot(
            userDocRef,
            async (userDoc) => {
              if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('User document data from Firestore:', userData); // Log de los datos crudos del usuario

                let organizationName: string | null = null;

                // Verificar si el usuario tiene un organitationId
                if (userData.organitationId) {
                  try {
                    const orgDocRef = doc(firestore, 'organitations', userData.organitationId);
                    const orgDoc = await getDoc(orgDocRef);

                    if (orgDoc.exists()) {
                      organizationName = orgDoc.data()?.name || null;
                      console.log('Organization name:', organizationName); // Log para la organización
                    }
                  } catch (orgError) {
                    console.error('Error al obtener la organización desde Firestore:', orgError);
                  }
                }

                // Calcular puntaje global dinámicamente
                const levelStatus = userData.levelStatus || {};
                console.log('Level Status from Firestore:', levelStatus); // Log del estado de los niveles

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

                console.log('Mapped Level Scores:', levelScores); // Log de los puntajes mapeados

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
                console.warn(`No se encontró el documento del usuario con UID: ${user.uid}`);
                setUserData(null);
              }
            },
            (error) => {
              console.error('Error al obtener datos del usuario:', error);
              setUserData(null);
            }
          );
        } catch (error) {
          console.error('Error al establecer listener en el documento del usuario:', error);
          setUserData(null);
        }
      } else {
        console.warn('No user authenticated.');
        setUserData(null);

        // Desuscribirse del listener del documento del usuario si existe
        if (unsubscribeUserDoc) {
          unsubscribeUserDoc();
        }
      }
    });

    return () => {
      // Limpiar suscripciones al desmontar el componente
      unsubscribeAuth();
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
