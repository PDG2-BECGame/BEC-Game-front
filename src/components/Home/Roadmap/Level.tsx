import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { UserContext } from '../../../context/UserContext'; // Importamos el UserContext

interface LevelProps {
    id: number; // Identificador único del nivel
    nivel: string;
    titulo: string;
    descripcion: string;
    logo: string;
}

const Level: React.FC<LevelProps> = ({ id, nivel, titulo, descripcion, logo }) => {
    const navigate = useNavigate(); // Hook para navegar

    // Accedemos al UserContext
    const userContext = useContext(UserContext);

    if (!userContext) {
        return null; // Si el contexto no está disponible, retornamos null
    }

    const { user } = userContext;
    const levelScore = user.levelScores[id] || 0; // Obtenemos el puntaje del nivel actual
    const isCompleted = levelScore >= 500; // Determinamos si el nivel está completado

    const handleContinue = () => {
        navigate(`/videoTraining/${id}`); // Navegamos a la ruta del VideoTraining correspondiente
    };

    return (
        <div
            className="flex flex-col p-6 border-2 rounded-xl shadow-md bg-white max-w-4xl w-full gap-4 font-poppins"
            style={{ borderColor: '#031F35' }} // Cambio del color del borde
        >
            {/* Encabezado */}
            <div className="flex flex-col">
                <h3 className="text-xl font-bold text-black mb-1">{nivel}</h3>
                <p className="text-sm text-black mb-1">{titulo}</p>
                <p className="text-sm font-bold text-purple-700 mb-4">
                    Puntos: {levelScore} / 500
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