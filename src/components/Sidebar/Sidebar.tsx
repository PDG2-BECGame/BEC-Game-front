import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link y useNavigate
import { AuthContext } from '../../context/AuthContext'; // Importamos el contexto de autenticación
import logo from '../../assets/BePRO_logo.svg'; // Ajuste de ruta para el logo
import inicioImg from '../../assets/Inicio.svg';
import perfil from '../../assets/Perfil.svg';
import clasificado from '../../assets/tabla_clasificacion.svg';
import ayuda from '../../assets/Ayuda.svg';

const Sidebar = () => {
  const authContext = useContext(AuthContext); // Consumimos el contexto de autenticación
  const navigate = useNavigate(); // Hook para redirección

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      if (authContext?.logout) {
        await authContext.logout(); // Llamamos a la función logout del contexto
        navigate('/login'); // Redirigimos al usuario a la página de inicio de sesión
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-customBlue to-customPurple text-white w-56 max-w-56 h-screen fixed top-0 left-0 flex flex-col items-center py-4">
      <div className="fixed flex flex-col justify-center">
        <img src={logo} alt="Logo" className="mb-4 pt-8" />
        <nav className="flex flex-col space-y-4 py-12">
          <Link to="/" className="font-poppins flex items-center hover:text-gray-300 gap-2">
            <img src={inicioImg} alt="Imagen de inicio" />
            Inicio
          </Link>
          <Link to="/profile" className="font-poppins flex items-center hover:text-gray-300 gap-2">
            <img src={perfil} alt="Imagen de perfil" />
            Perfil
          </Link>
          <Link to="/classification" className="font-poppins flex items-center hover:text-gray-300 gap-2">
            <img src={clasificado} alt="Imagen de clasificado" />
            Clasificado
          </Link>
          <Link
            to="#"
            className="font-poppins flex items-center text-gray-500 gap-2"
            onClick={(e) => e.preventDefault()} // Evita la acción por defecto
          >
            <img src={ayuda} alt="Imagen de ayuda" />
            Ayuda
          </Link>

        </nav>
      </div>
      {/* Botón de Cerrar Sesión */}
      <div className="mt-auto flex justify-center w-full pb-4">
        <button
          className="font-poppins font-bold text-[#041D31] bg-white w-40 h-10 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
