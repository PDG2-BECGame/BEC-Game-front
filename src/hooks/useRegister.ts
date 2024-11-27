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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
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
      setError(err.message);
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
    handleRegister,
  };
};

export default useRegister;