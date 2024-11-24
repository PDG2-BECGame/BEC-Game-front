import React from "react";

interface FeedbackProps {
  isCorrect: boolean | null;
  feedbackMessage: string;
}

const Feedback: React.FC<FeedbackProps> = ({ isCorrect, feedbackMessage }) => {
  return (
    <div className="mt-4 p-4 bg-gray-200 rounded">
      <p className="text-lg font-semibold">
        {isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta"}
      </p>
      <p className="mt-2">{feedbackMessage}</p>
    </div>
  );
};

export default Feedback;
