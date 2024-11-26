import React from "react";

interface QuizResultsProps {
  levelScore: number;
  maxScore: number; // Agregamos maxScore a los props
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ levelScore, maxScore, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">¡Quiz Completado!</h2>
      <p className="text-lg mb-4">
        Obtuviste <span className="font-semibold">{levelScore}</span> puntos de un total posible de{" "}
        <span className="font-semibold">{maxScore}</span> puntos.
      </p>
      <button
        onClick={onRestart}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default QuizResults;
