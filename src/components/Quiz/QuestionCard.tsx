import React from 'react';

interface QuestionCardProps {
    questionText: string;
    image?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionText, image }) => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{questionText}</h2>
        {image && (
            <img src={image} alt="Question Image" className="w-full h-auto rounded-md" />
        )}
    </div>
);

export default QuestionCard;
