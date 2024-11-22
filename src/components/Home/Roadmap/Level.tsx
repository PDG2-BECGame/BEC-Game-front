import React from 'react';

interface LevelProps {
    nivel: string;
    titulo: string;
    puntaje: number;
    descripcion: string;
    logo: string; // Nueva propiedad para el logo
}

const Level: React.FC<LevelProps> = ({ nivel, titulo, puntaje, descripcion, logo }) => {
    return (
        <div className="flex flex-col p-6 border-2 border-red-300 rounded-xl shadow-md bg-white max-w-4xl w-full gap-4 font-poppins">
            {/* Encabezado */}
            <div className="flex flex-col">
                <h3 className="text-xl font-bold text-black mb-1">{nivel}</h3>
                <p className="text-sm text-black mb-1">
                    {titulo}
                </p>
                <p className="text-sm font-bold text-purple-700 mb-4">Puntos: {puntaje}/500</p>
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
                    <p className="text-black leading-6">
                        {descripcion}
                    </p>
                </div>
            </div>

            {/* Botón */}
            <div className="flex justify-end mt-4">
                <button className="bg-purple-500 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-purple-600 transition duration-200">
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default Level;