import React from 'react';

interface QuestionCardProps {
    questionText: string;
    image?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionText, image }) => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{questionText}</h2>
        {image && (
            <div className="flex justify-center items-center">
                <img
                    src={image}
                    alt="Question Image"
                    className="w-full max-w-xl max-h-96 rounded-md object-contain"
                />
            </div>
        )}
    </div>
);

export default QuestionCard;
