import React from 'react';
import { USER_DATA } from '../consts/profile.d';
import avatar from '../assets/ProfileExample.png'; 

const Profile: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 text-gray-800 rounded-xl shadow-md max-w-lg mx-auto mt-10 border border-gray-300">
      <div className="flex items-center mb-6">
        <img
          src={avatar}
          alt="Avatar del Usuario"
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold font-poppins">{USER_DATA.name}</h1>
          <p className="text-sm text-gray-500">{USER_DATA.organization}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600">Correo Electrónico:</h2>
          <p className="text-gray-700">{USER_DATA.email}</p>
        </div>
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600">Organización:</h2>
          <p className="text-gray-700">{USER_DATA.organization}</p>
        </div>
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600">Puntaje Total:</h2>
          <p className="text-gray-700">{USER_DATA.totalScore}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
