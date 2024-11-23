import React from 'react';

interface HeaderQuizProps {
  currentLevel: number;
  totalQuestions: number;
  levelScore: number; // Nueva prop para el puntaje del nivel
  onExit: () => void;
}

const HeaderQuiz: React.FC<HeaderQuizProps> = ({ currentLevel, totalQuestions, levelScore, onExit }) => (
  <header className="w-full flex justify-between items-center py-4 px-6 bg-gradient-to-r from-customBlue to-customPurple text-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold">Nivel {currentLevel}</h1>
    <div className="flex items-center space-x-4">
      <p className="text-lg">
        Puntuación: {levelScore} / {totalQuestions * 250}
      </p>
      <button
        className="bg-white text-customPurple px-4 py-2 rounded-md hover:bg-gray-100 transition"
        onClick={onExit}
      >
        Salir
      </button>
    </div>
  </header>
);

export default HeaderQuiz;