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
    <div className="min-h-screen flex">
      {/* Columna Izquierda */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-customBlue to-customPurple text-white flex-col items-start justify-center p-8">
        <div className="px-8">
          {/* Logo y Título */}
          <div className="flex items-center mb-6">
          <img src={BePROLogo} alt="BePRO Logo" className="h-32 w-32 mr-4" /> {/* Logo más grande */}
            <h1 className="text-6xl font-bold">BEPRO</h1> {/* BEPRO más grande */}
          </div>

          {/* Frase Principal */}
          <h2 className="text-4xl font-semibold mb-4">Domina, detecta, defiende</h2>

          {/* Descripción */}
          <p className="text-xl">
            Juego serio para capacitar a empleados en la detección de técnicas de ingeniería social y reducir ataques de compromiso de correo electrónico empresarial (BEC).
          </p>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="max-w-md w-full">
          {/* Logo y Título en pantallas pequeñas */}
          <div className="lg:hidden flex items-center justify-center mb-6">
            <img src={BePROLogo} alt="BePRO Logo" className="h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold">BEPRO</h1>
          </div>

          <h2 className="text-3xl font-bold mb-6">Crear una cuenta</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleRegister} className="w-full">
            {/* Nombre Completo */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customBlue"
                required
              />
            </div>

            {/* Correo Electrónico */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customBlue"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customBlue"
                required
              />
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customBlue"
                required
              />
            </div>

            {/* Organización */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Organización (Opcional)</label>
              <select
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customBlue mb-2"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-customBlue"
                disabled={!!organization}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-customBlue text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Registrarse
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-customBlue hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;