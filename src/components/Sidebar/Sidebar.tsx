import React from 'react';
import logo from '../../assets/logo.svg'; // Ajuste de ruta para el logo

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-full w-60 flex flex-col items-center py-4">
      <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
      <nav className="flex flex-col space-y-4">
        <a href="/home" className="hover:text-gray-300">Inicio</a>
        <a href="/classified" className="hover:text-gray-300">Clasificado</a>
      </nav>
    </div>
  );
};

export default Sidebar;