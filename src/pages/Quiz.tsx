import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { questionsByLevel, Question } from "../consts/questions";

// Importamos el UserContext
import { UserContext } from "../context/UserContext";

// Importa los componentes
import HeaderQuiz from "../components/Quiz/HeaderQuiz";
import QuestionCard from "../components/Quiz/QuestionCard";
import Options from "../components/Quiz/Options";
import Feedback from "../components/Quiz/Feedback";
import Footer from "../components/Quiz/Footer";

const Quiz: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const currentLevel = parseInt(level || "1", 10);
  const questions = questionsByLevel[currentLevel];

  if (!questions) {
    return <p>No hay preguntas para este nivel.</p>;
  }

  // Accedemos al UserContext
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <p>Cargando...</p>;
  }

  // Extraemos updateLevelScore del contexto
  const { updateLevelScore } = userContext;

  // Estados locales del componente
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [levelScore, setLevelScore] = useState<number>(0); // Estado para el puntaje del nivel

  // Estado para almacenar el feedback actual
  const [currentFeedback, setCurrentFeedback] = useState<string>("");

  const currentQuestion: Question = questions[currentQuestionIndex];

  // Función para manejar la salida del quiz
  const navigate = useNavigate();

  const handleExit = () => {
    // Aquí puedes agregar lógica adicional, como confirmar la salida
    navigate("/"); // Redirecciona a la página de inicio
  };

  // Maneja la selección de una opción
  const handleOptionClick = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    const correct = index === currentQuestion.answer;
    setIsCorrect(correct);
    setHasAnswered(true);

    if (correct) {
      setLevelScore((prevScore) => prevScore + 250); // Acumulamos el puntaje localmente
    }

    // Almacenar el feedback de la pregunta actual
    setCurrentFeedback(
      currentQuestion.feedback ??
        (correct ? "¡Respuesta correcta!" : "Respuesta incorrecta")
    );
  };

  // Maneja el paso a la siguiente pregunta
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setHasAnswered(false);
      setCurrentFeedback(""); // Reiniciamos el feedback
    } else {
      // Actualizamos el puntaje del nivel en el contexto
      updateLevelScore(currentLevel, levelScore);

      // Aquí puedes redireccionar al usuario o mostrar una pantalla de resultados
      alert(`¡Has completado el nivel! Obtuviste ${levelScore} puntos.`);
      navigate("/"); // Redirecciona a la página de inicio
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <HeaderQuiz
        currentLevel={currentLevel}
        totalQuestions={questions.length}
        levelScore={levelScore} // Pasamos levelScore al HeaderQuiz
        onExit={handleExit}
      />

      {/* Contenido principal */}
      <main className="flex-grow p-6 flex flex-row items-start justify-center pb-24">
        {/* Columna de Feedback */}
        {hasAnswered && (
          <div className="w-1/4 mr-4">
            <Feedback
              isCorrect={isCorrect}
              feedbackMessage={currentFeedback}
            />
          </div>
        )}

        {/* Columna de Pregunta y Opciones */}
        <div className={`flex flex-col items-center ${hasAnswered ? 'w-3/4' : 'w-full'}`}>
          {/* Pregunta */}
          <QuestionCard
            questionText={currentQuestion.question}
            image={currentQuestion.image} // Pasamos la imagen si existe
          />

          {/* Opciones */}
          <Options
            options={currentQuestion.options}
            selectedOption={selectedOption}
            correctAnswer={currentQuestion.answer}
            hasAnswered={hasAnswered}
            handleOptionClick={handleOptionClick}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        hasAnswered={hasAnswered}
        handleNext={handleNext}
      />
    </div>
  );
};

export default Quiz;