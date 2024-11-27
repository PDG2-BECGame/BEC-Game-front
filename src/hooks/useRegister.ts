// src/hooks/useRegister.ts
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [newOrganization, setNewOrganization] = useState('');
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState(''); // Nuevo estado para errores de contraseña
  const navigate = useNavigate();

  // Cargar las organizaciones existentes desde Firebase
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgsSnapshot = await getDocs(collection(firestore, 'organitations'));
        const orgs = orgsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrganizations(orgs);
      } catch (err) {
        console.error('Error al cargar organizaciones:', err);
      }
    };
    fetchOrganizations();
  }, []);

  // Función para validar la contraseña
  const validatePassword = (password: string): string => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Debe tener al menos 8 caracteres.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Debe contener al menos una letra minúscula.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Debe contener al menos una letra mayúscula.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Debe contener al menos un número.');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Debe contener al menos un carácter especial (!@#$%^&*).');
    }
    return errors.join(' ');
  };

  // useEffect para validar la contraseña en tiempo real
  useEffect(() => {
    if (password) {
      const validationError = validatePassword(password);
      setPasswordError(validationError);
    } else {
      setPasswordError('');
    }
  }, [password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Validar la fortaleza de la contraseña
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Enviar correo de verificación
      await sendEmailVerification(user);

      // Crear o seleccionar organización
      let selectedOrganizationId = organization;
      if (newOrganization) {
        const orgRef = await addDoc(collection(firestore, 'organitations'), {
          name: newOrganization,
        });
        selectedOrganizationId = orgRef.id;
      }

      // Estructura inicial de levelStatus
      const initialLevelStatus = {
        level1: { score: 0, maxScore: 500 },
        level2: { score: 0, maxScore: 500 },
        level3: { score: 0, maxScore: 250 },
      };

      // Crear documento para el usuario en Firestore
      const userDoc = {
        id: user.uid,
        name,
        email,
        organitationId: selectedOrganizationId || '',
        levelStatus: initialLevelStatus,
      };
      await setDoc(doc(firestore, 'users', user.uid), userDoc);

      // Redirigir a una página que indique que se envió el correo de verificación
      navigate('/verify-email');
    } catch (err: any) {
      // Manejar errores específicos de Firebase
      if (err.code === 'auth/email-already-in-use') {
        setError('El correo electrónico ya está en uso. Por favor, utiliza otro correo o inicia sesión.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El correo electrónico no es válido. Por favor, verifica e intenta nuevamente.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña es demasiado débil. Por favor, utiliza una contraseña más segura.');
      } else {
        setError('Ocurrió un error durante el registro. Por favor, intenta nuevamente más tarde.');
      }
      console.error('Error durante el registro:', err);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    organization,
    setOrganization,
    newOrganization,
    setNewOrganization,
    organizations,
    error,
    passwordError, // Incluido en el retorno
    handleRegister,
  };
};

export default useRegister;
