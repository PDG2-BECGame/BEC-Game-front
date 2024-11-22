import React from 'react';
import { classificationData, UserRanking } from '../consts/classificationData';

const Classification: React.FC = () => {
  // Ordenamos los datos por puntaje
  const sortedData = [...classificationData].sort((a, b) => b.score - a.score);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tabla de Clasificación</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">Puesto</th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">Nombre</th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">Organización</th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user: UserRanking, index: number) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.organization}</td>
              <td className="py-2 px-4 border-b text-center">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classification;
