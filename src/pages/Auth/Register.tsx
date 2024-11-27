import React from 'react';
import { Link } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';
import BePROLogo from '../../assets/BePRO_logo.svg'; // Asegúrate de importar correctamente tu logo

const Register: React.FC = () => {
  const {
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
  } = useRegister();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna Izquierda */}
      <div className="md:w-1/2 w-full bg-blue-600 text-white flex flex-col justify-center items-center p-8">
        <img src={BePROLogo} alt="BePRO Logo" className="h-20 mb-6" />
        <h1 className="text-5xl font-bold mb-4">Bienvenido a BePRO</h1>
        <p className="text-lg text-center">
          Únete a nuestra comunidad y comienza tu camino hacia el éxito profesional.
        </p>
      </div>

      {/* Columna Derecha */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold mb-6">Crear una cuenta</h2>
        <form onSubmit={handleRegister} className="w-full max-w-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Organización */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Organización (Opcional)
            </label>
            <select
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 mb-2"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              disabled={!!organization}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
