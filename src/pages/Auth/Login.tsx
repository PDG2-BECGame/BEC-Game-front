import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import BePROLogo from '../../assets/BePRO_logo.svg'; // Asegúrate de importar correctamente tu logo

const Login: React.FC = () => {
  const { email, setEmail, password, setPassword, error, handleLogin } = useLogin();

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

          {/* Frase "Domina, detecta, defiende" */}
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

          <h2 className="text-3xl font-bold mb-6">Iniciar Sesión</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleLogin} className="w-full">
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

            <div className="mb-6">
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

            <button
              type="submit"
              className="w-full bg-customBlue text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Ingresar
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-customBlue hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;