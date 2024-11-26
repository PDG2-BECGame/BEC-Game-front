import React from 'react';
import useFetchUsers, { UserData } from '../hooks/useFetchUsers';

const Classification: React.FC = () => {
  const { users, isLoading, error } = useFetchUsers();

  if (isLoading) {
    return <p>Cargando datos de clasificación...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tabla de Clasificación</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">
              Puesto
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">
              Nombre
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">
              Organización
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">
              Puntaje Total
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">
              Nivel 1
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">
              Nivel 2
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border-b">
              Nivel 3
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserData, index: number) => (
            <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.organization}</td>
              <td className="py-2 px-4 border-b text-center">{user.totalScore}</td>
              <td className="py-2 px-4 border-b text-center">
                {user.levelStatus.level1?.score || 0}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.levelStatus.level2?.score || 0}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.levelStatus.level3?.score || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classification;
