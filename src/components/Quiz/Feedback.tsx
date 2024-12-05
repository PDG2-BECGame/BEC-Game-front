import React from "react";

interface FeedbackProps {
  isCorrect: boolean | null;
  feedbackMessage: string;
  correctAnswerIndex: number;
}

const Feedback: React.FC<FeedbackProps> = ({
  isCorrect,
  feedbackMessage,
  correctAnswerIndex,
}) => {
  if (isCorrect === null) return null;

  const correctLetter = String.fromCharCode(97 + correctAnswerIndex) + ')';

  // Reemplazar el marcador de posición en el mensaje de retroalimentación
  const updatedFeedbackMessage = feedbackMessage.replace(
    "{correctLetter}",
    correctLetter
  );

  return (
    <div className="mt-4 p-4 bg-gray-200 rounded">
      <p className="text-lg font-semibold">
        {isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta"}
      </p>
      <p className="mt-2">{updatedFeedbackMessage}</p>
    </div>
  );
};

export default Feedback;
