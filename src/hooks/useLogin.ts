import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        // Cerrar sesión y redirigir a la página de verificación
        await auth.signOut();
        navigate('/verify-email');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError('Correo electrónico o contraseña incorrectos.');
      console.error('Error durante el inicio de sesión:', err);
    }
  };


  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};

export default useLogin;
