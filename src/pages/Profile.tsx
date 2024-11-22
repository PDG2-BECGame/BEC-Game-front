import React from 'react';

interface User {
  name: string;
  email: string;
  organization: string;
  totalScore: number;
}

const Profile: React.FC = () => {
  // Datos de ejemplo del usuario
  const user: User = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    organization: 'Empresa XYZ',
    totalScore: 1200,
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil del Usuario</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Nombre:</h2>
          <p className="text-gray-600">{user.name}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Correo Electrónico:</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Organización:</h2>
          <p className="text-gray-600">{user.organization}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Puntaje Total:</h2>
          <p className="text-gray-600">{user.totalScore}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
