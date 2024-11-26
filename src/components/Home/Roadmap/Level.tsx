import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

interface LevelProps {
  id: number;
  nivel: string;
  titulo: string;
  descripcion: string;
  logo: string;
}

const Level: React.FC<LevelProps> = ({ id, nivel, titulo, descripcion, logo }) => {
  const navigate = useNavigate();

  // Accedemos al UserContext
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>; // Muestra un estado de carga si el contexto no está disponible
  }

  const { user } = userContext;

  if (!user) {
    return <div>Loading user data...</div>; // Muestra un estado de carga si el usuario no está cargado
  }

  // Generamos la clave dinámica para acceder al nivel (e.g., "level1", "level2")
  const levelKey = `level${id}`;
  const levelData = user.levelScores?.[levelKey] || { score: 0, maxScore: 0 };

  // Extraemos el puntaje actual y el máximo puntaje
  const score = levelData.score;
  const maxScore = levelData.maxScore;

  // Verificamos si el nivel está completo
  const isCompleted = score >= maxScore;

  const handleContinue = () => {
    navigate(`/videoTraining/${id}`);
  };

  return (
    <div
      className="flex flex-col p-6 border-2 rounded-xl shadow-md bg-white max-w-4xl w-full gap-4 font-poppins"
      style={{ borderColor: '#031F35' }}
    >
      {/* Encabezado */}
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-black mb-1">{nivel}</h3>
        <p className="text-sm text-black mb-1">{titulo}</p>
        <p className="text-sm font-bold text-purple-700 mb-4">
          Puntos: {score} / {maxScore}
        </p>
        {isCompleted && (
          <span className="text-green-600 font-bold">Completado</span>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Logo */}
        <div className="flex justify-center items-center w-full md:w-1/4">
          <img src={logo} alt={`Logo ${nivel}`} className="max-w-full h-auto" />
        </div>

        {/* Descripción */}
        <div className="flex flex-col w-full md:w-3/4">
          <p className="text-sm font-bold text-black mb-2">Descripción:</p>
          <p className="text-black leading-6">{descripcion}</p>
        </div>
      </div>

      {/* Botón */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-[#592BBC] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#360B9E] transition duration-200"
          onClick={handleContinue}
        >
          {isCompleted ? 'Repetir Nivel' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};

export default Level;
