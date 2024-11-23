import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link
import logo from '../../assets/BePRO_logo.svg'; // Ajuste de ruta para el logo
import inicioImg from '../../assets/Inicio.svg';
import perfil from '../../assets/Perfil.svg';
import clasificado from '../../assets/tabla_clasificacion.svg';
import ayuda from '../../assets/Ayuda.svg';

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-r from-customBlue to-customPurple text-white w-56 max-w-56 h-screen fixed top-0 left-0 flex flex-col items-center py-4">
      <div className='fixed flex flex-col justify-center'>
        <img src={logo} alt="Logo" className="mb-4 pt-8" />
        <nav className="flex flex-col space-y-4 py-12">
          <Link to="/" className="font-poppins flex items-center hover:text-gray-300 gap-2">
            <img src={inicioImg} alt='Imagen de inicio' />
            Inicio
          </Link>
          <Link to="/profile" className="font-poppins flex items-center hover:text-gray-300 gap-2">
            <img src={perfil} alt='Imagen de perfil' />
            Perfil
          </Link>
          <Link to="/classification" className="font-poppins flex items-center hover:text-gray-300 gap-2">
            <img src={clasificado} alt='Imagen de clasificado' />
            Clasificado
          </Link>
          <Link to="/help" className="font-poppins flex items-center hover:text-gray-300 gap-2">
            <img src={ayuda} alt='Imagen de ayuda' />
            Ayuda
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;