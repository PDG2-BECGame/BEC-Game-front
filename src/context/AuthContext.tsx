import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null; // Datos adicionales del usuario
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface User {
  name: string;
  email: string;
  organization: string;
  totalScore: number;
  levelScores: { [level: number]: number }; // Puntajes por nivel
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Traer datos del usuario desde Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data() as User);
        } else {
          // Manejo de usuarios nuevos (si no existen en Firestore)
          setUserData(null);
        }
      } else {
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