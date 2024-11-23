import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { questionsByLevel } from "../consts/questions";

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

  const { updateUserScore } = userContext;

  // Estados locales del componente
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [levelScore, setLevelScore] = useState<number>(0); // Nuevo estado para el puntaje del nivel

  const currentQuestion = questions[currentQuestionIndex];

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
      updateUserScore(250);
      setLevelScore((prevScore) => prevScore + 250);
    }
  };

  // Maneja el paso a la siguiente pregunta
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setHasAnswered(false);
    } else {
      alert(`¡Has completado el nivel! Obtuviste ${levelScore} puntos.`);
      // Redirecciona al usuario a la página de inicio o donde prefieras
      navigate("/");
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
      <main className="flex-grow p-6 flex flex-col items-center justify-center pb-24">
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

        {/* Feedback de la respuesta */}
        <Feedback isCorrect={isCorrect} hasAnswered={hasAnswered} />
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