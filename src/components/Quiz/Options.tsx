import React from 'react';

interface OptionsProps {
    options: string[];
    selectedOption: number | null;
    correctAnswer: number;
    hasAnswered: boolean;
    handleOptionClick: (index: number) => void;
}

const Options: React.FC<OptionsProps> = ({
    options,
    selectedOption,
    correctAnswer,
    hasAnswered,
    handleOptionClick,
}) => {
    // Determinar el número de columnas en función del número de opciones
    const gridCols = options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2';

    return (
        <div className={`grid ${gridCols} gap-4 w-full max-w-2xl`}>
            {options.map((option, index) => {
                // Determina el color del botón según la respuesta
                let bgColor = "bg-blue-500 hover:bg-blue-600";
                if (hasAnswered) {
                    if (index === correctAnswer) {
                        bgColor = "bg-green-500";
                    } else if (index === selectedOption) {
                        bgColor = "bg-red-500";
                    } else {
                        bgColor = "bg-gray-300";
                    }
                }

                // Obtener la letra correspondiente al índice
                const letter = String.fromCharCode(97 + index) + ')'; // 97 es el código ASCII de 'a'

                return (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        disabled={hasAnswered}
                        className={`p-4 rounded-lg shadow text-white transition ${bgColor}`}
                    >
                        <span className="font-bold mr-2">{letter}</span>{option}
                    </button>
                );
            })}
        </div>
    );
};

export default Options;
