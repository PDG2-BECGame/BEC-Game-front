import React from 'react';

interface FooterProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  hasAnswered: boolean;
  handleNext: () => void;
}

const Footer: React.FC<FooterProps> = ({
  currentQuestionIndex,
  totalQuestions,
  hasAnswered,
  handleNext,
}) => (
  <footer className="bg-white p-4 shadow-md flex justify-between items-center sticky bottom-0">
    <p className="text-gray-700">
      Pregunta {currentQuestionIndex + 1} de {totalQuestions}
    </p>
    <button
      onClick={handleNext}
      disabled={!hasAnswered}
      className={`${
        hasAnswered
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-300 cursor-not-allowed"
      } text-white px-4 py-2 rounded-lg transition`}
    >
      Siguiente
    </button>
  </footer>
);

export default Footer;
