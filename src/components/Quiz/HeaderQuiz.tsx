import React from 'react';

interface HeaderProps {
  currentLevel: number;
  score: number;
  totalQuestions: number;
}

const HeaderQuiz: React.FC<HeaderProps> = ({ currentLevel, score, totalQuestions }) => (
  <header className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
    <h1 className="text-xl font-bold">Nivel {currentLevel}</h1>
    <p>Puntuación: {score}/{totalQuestions}</p>
    <button className="text-red-200 font-semibold hover:text-red-500 transition">X</button>
  </header>
);

export default HeaderQuiz;
