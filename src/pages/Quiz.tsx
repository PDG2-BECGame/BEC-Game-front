import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Importamos el hook para cargar las preguntas
import useFetchQuestions from "../hooks/useFetchQuestions";

// Importa los componentes
import HeaderQuiz from "../components/Quiz/HeaderQuiz";
import QuestionCard from "../components/Quiz/QuestionCard";
import Options from "../components/Quiz/Options";
import Feedback from "../components/Quiz/Feedback";
import Footer from "../components/Quiz/Footer";
import QuizResults from "../components/Quiz/QuizResults";

const Quiz: React.FC = () => {
  // Extrae `level` de los parámetros de la URL
  const { level } = useParams<{ level: string }>();

  // Validación inicial para `level`
  if (!level) {
    console.error("Error: level es undefined");
    return <p>Error: No se especificó el nivel. Verifica la URL.</p>;
  }

  // Usa el hook para cargar las preguntas
  const { questions, isLoading, error } = useFetchQuestions(level);

  // Accede al UserContext
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <p>Error: No se encontró el contexto de usuario.</p>;
  }

  // Extrae propiedades y métodos del contexto
  const { updateLevelScore } = userContext;

  // Manejo de estados locales
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [levelScore, setLevelScore] = useState<number>(0);
  const [currentFeedback, setCurrentFeedback] = useState<string>("");
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const navigate = useNavigate();

  // Manejo de carga y errores
  if (isLoading) {
    return <p>Cargando preguntas...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!questions || questions.length === 0) {
    return <p>No hay preguntas disponibles para este nivel.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    const correct = index === currentQuestion.answer;
    setIsCorrect(correct);
    setHasAnswered(true);

    if (correct) {
      setLevelScore((prevScore) => prevScore + 250);
    }

    setCurrentFeedback(
      currentQuestion.feedback ?? (correct ? "¡Respuesta correcta!" : "Respuesta incorrecta")
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setHasAnswered(false);
      setCurrentFeedback("");
    } else {
      updateLevelScore(parseInt(level, 10), levelScore); // Convierte `level` a número
      setQuizCompleted(true);
    }
  };

  const handleExit = () => navigate("/");
  const handleRestart = () => navigate("/");

  if (quizCompleted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <HeaderQuiz
          currentLevel={level}
          totalQuestions={questions.length}
          levelScore={levelScore}
          onExit={handleExit}
        />
        <main className="flex-grow p-6 flex flex-col items-center justify-center pb-24">
          <QuizResults
            levelScore={levelScore}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderQuiz
        currentLevel={level}
        totalQuestions={questions.length}
        levelScore={levelScore}
        onExit={handleExit}
      />
      <main className="flex-grow p-6 flex flex-row items-start justify-center pb-24">
        {hasAnswered && (
          <div className="w-1/4 mr-4">
            <Feedback isCorrect={isCorrect} feedbackMessage={currentFeedback} />
          </div>
        )}
        <div className={`flex flex-col items-center ${hasAnswered ? "w-3/4" : "w-full"}`}>
          <QuestionCard questionText={currentQuestion.question} image={currentQuestion.image} />
          <Options
            options={currentQuestion.options}
            selectedOption={selectedOption}
            correctAnswer={currentQuestion.answer}
            hasAnswered={hasAnswered}
            handleOptionClick={handleOptionClick}
          />
        </div>
      </main>
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