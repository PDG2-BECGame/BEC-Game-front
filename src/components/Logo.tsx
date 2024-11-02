// src/components/Logo.tsx
import React from 'react';
import logo from '../assets/Logo.png'; // Asegúrate de que esta ruta apunte a src/assets/Logo.png

export default function Logo() {
    return <img src={logo} alt="Logo" className="h-48 mx-auto" />;
}
