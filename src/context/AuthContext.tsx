import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';

// Interfaz para los datos adicionales del usuario
interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean; // Agregamos el estado de carga
  logout: () => Promise<void>;
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
  organitationId: string | null;
  organizationName: string | null;
  totalScore: number;
  levelScores: LevelStatus;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    let unsubscribeUserDoc: () => void = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // Verificar si el correo electrónico ha sido verificado
        if (!user.emailVerified) {
          // Opcional: Puedes redirigir al usuario a una página de verificación aquí
          console.log('El correo electrónico no ha sido verificado.');
        }

        try {
          // Obtener la referencia al documento del usuario
          const userDocRef = doc(firestore, 'users', user.uid);

          // Establecer listener en tiempo real en el documento del usuario
          unsubscribeUserDoc = onSnapshot(
            userDocRef,
            async (userDoc) => {
              if (userDoc.exists()) {
                const userData = userDoc.data();

                let organizationName: string | null = null;

                // Verificar si el usuario tiene un organitationId
                if (userData.organitationId) {
                  try {
                    const orgDocRef = doc(firestore, 'organitations', userData.organitationId);
                    const orgDoc = await getDoc(orgDocRef);

                    if (orgDoc.exists()) {
                      organizationName = orgDoc.data()?.name || null;
                    }
                  } catch (orgError) {
                    console.error('Error al obtener la organización desde Firestore:', orgError);
                  }
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
                setUserData(null);
              }

              setLoading(false); // Finalizamos la carga
            },
            (error) => {
              console.error('Error al obtener datos del usuario:', error);
              setUserData(null);
              setLoading(false);
            }
          );
        } catch (error) {
          console.error('Error al establecer listener en el documento del usuario:', error);
          setUserData(null);
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);

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
    <AuthContext.Provider value={{ currentUser, userData, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
