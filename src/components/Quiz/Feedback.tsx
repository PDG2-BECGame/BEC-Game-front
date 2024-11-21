import React from 'react';

interface FeedbackProps {
  isCorrect: boolean | null;
  hasAnswered: boolean;
}

const Feedback: React.FC<FeedbackProps> = ({ isCorrect, hasAnswered }) => {
  if (!hasAnswered) return null;

  return (
    <p className="mt-4 text-lg font-semibold">
      {isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta"}
    </p>
  );
};

export default Feedback;
