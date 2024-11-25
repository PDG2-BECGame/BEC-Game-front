import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth, firestore } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
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
      const orgsSnapshot = await getDocs(collection(firestore, 'organitations'));
      const orgs = orgsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrganizations(orgs);
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

      // Crear o seleccionar organización
      let selectedOrganizationId = organization;
      if (newOrganization) {
        const orgRef = await addDoc(collection(firestore, 'organitations'), {
          name: newOrganization,
        });
        selectedOrganizationId = orgRef.id;
      }

      // Crear documento para el usuario en Firestore
      const userDoc = {
        id: user.uid,
        name,
        email,
        organitationId: selectedOrganizationId || '',
        levelStatus: {
          global: 0,
          level1: 0,
          level2: 0,
          level3: 0,
        },
      };
      await setDoc(doc(firestore, 'users', user.uid), userDoc);

      navigate('/');
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Registro</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organización (Opcional)
          </label>
          <select
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            disabled={!!newOrganization}
          >
            <option value="">Seleccione una organización</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Crear nueva organización"
            value={newOrganization}
            onChange={(e) => setNewOrganization(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            disabled={!!organization}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;