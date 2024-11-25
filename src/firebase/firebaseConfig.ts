import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios que necesitas
const auth = getAuth(app);
const firestore = getFirestore(app);

/**
 * Crea o actualiza un documento para un usuario en Firestore.
 * @param uid - El ID único del usuario en Firebase Authentication.
 * @param data - Los datos que se guardarán en Firestore.
 * @throws Error - Lanza un error si no se puede crear o actualizar el documento.
 */
export const createUserDocument = async (uid: string, data: Record<string, any>): Promise<void> => {
  if (!uid || typeof uid !== 'string') {
    throw new Error('El UID del usuario es requerido y debe ser un string.');
  }

  if (!data || typeof data !== 'object') {
    throw new Error('Los datos del usuario son requeridos y deben ser un objeto.');
  }

  try {
    const userRef = doc(firestore, 'users', uid);
    await setDoc(userRef, data, { merge: true }); // Merge para evitar sobrescribir datos existentes
    console.log(`Documento creado o actualizado para el usuario con UID: ${uid}`);
  } catch (error) {
    console.error('Error al crear o actualizar el documento del usuario:', error);
    throw new Error('No se pudo crear o actualizar el documento del usuario.');
  }
};

export { app, auth, firestore };