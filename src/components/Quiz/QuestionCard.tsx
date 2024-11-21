import React from 'react';

interface QuestionCardProps {
  questionText: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionText }) => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-6">
    <h2 className="text-lg font-semibold text-gray-800">{questionText}</h2>
  </div>
);

export default QuestionCard;
