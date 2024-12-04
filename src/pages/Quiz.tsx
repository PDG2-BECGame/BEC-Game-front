import React, { useState, useContext, useEffect, useMemo } from "react";
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

// Define la interfaz para las preguntas
interface Question {
  question: string;
  options: string[];
  answer: number;
  feedback?: string;
  image?: string;
}

const Quiz: React.FC = () => {
  // Todos los Hooks deben estar al inicio del componente
  const { level } = useParams<{ level: string }>();
  const { questions, isLoading, error } = useFetchQuestions(level || "");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  // Estados locales
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [levelScore, setLevelScore] = useState<number>(0);
  const [currentFeedback, setCurrentFeedback] = useState<string>("");
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Aseguramos que `level` siempre tenga un valor
  const currentLevel = level || "";

  // Determinar el maxScore según el nivel
  let maxScore = 0;
  switch (currentLevel) {
    case '1':
      maxScore = 500;
      break;
    case '2':
      maxScore = 500;
      break;
    case '3':
      maxScore = 250;
      break;
    default:
      maxScore = 0;
  }

  // Función para mezclar las opciones y ajustar el índice de la respuesta correcta
  const shuffleOptions = (question: Question): Question => {
    // Combina las opciones con sus índices originales
    const optionsWithIndices = question.options.map((option, index) => ({
      option,
      index,
    }));

    // Algoritmo Fisher-Yates Shuffle para mezclar las opciones
    for (let i = optionsWithIndices.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [optionsWithIndices[i], optionsWithIndices[randomIndex]] = [
        optionsWithIndices[randomIndex],
        optionsWithIndices[i],
      ];
    }

    // Extrae las opciones mezcladas
    const shuffledOptions = optionsWithIndices.map((item) => item.option);

    // Encuentra el nuevo índice de la respuesta correcta
    const newAnswerIndex = optionsWithIndices.findIndex(
      (item) => item.index === question.answer
    );

    // Retorna la pregunta actualizada con las opciones mezcladas y el nuevo índice de la respuesta correcta
    return {
      ...question,
      options: shuffledOptions,
      answer: newAnswerIndex,
    };
  };


  // Aplicar la mezcla de opciones a las preguntas al cargarlas
  useEffect(() => {
    if (questions && questions.length > 0) {
      // Mezcla las opciones de cada pregunta
      const shuffled = questions.map((question) => shuffleOptions(question));
      setShuffledQuestions(shuffled);
    }
  }, [questions]);

  // Calcular el puntaje por pregunta
  const scorePerQuestion = useMemo(() => {
    return maxScore / (shuffledQuestions.length || 1);
  }, [maxScore, shuffledQuestions]);

  // Validaciones y retornos condicionales después de los Hooks
  if (!currentLevel) {
    return <p>Error: No se especificó el nivel. Verifica la URL.</p>;
  }

  if (!userContext) {
    return <p>Error: No se encontró el contexto de usuario.</p>;
  }

  const { updateLevelScore } = userContext;

  // Manejo de carga y errores
  if (isLoading) {
    return <p>Cargando preguntas...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!shuffledQuestions || shuffledQuestions.length === 0) {
    return <p>No hay preguntas disponibles para este nivel.</p>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    const correct = index === currentQuestion.answer;
    setIsCorrect(correct);
    setHasAnswered(true);

    if (correct) {
      setLevelScore((prevScore) => prevScore + scorePerQuestion);
    }

    setCurrentFeedback(
      currentQuestion.feedback ?? (correct ? "¡Respuesta correcta!" : "Respuesta incorrecta")
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setHasAnswered(false);
      setCurrentFeedback("");
    } else {
      const levelKey = `level${currentLevel}`; // 'level1', 'level2', etc.
      updateLevelScore(levelKey, levelScore, maxScore);

      setQuizCompleted(true);
    }
  };

  const handleExit = () => navigate("/");
  const handleRestart = () => navigate("/");

  if (quizCompleted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <HeaderQuiz
          currentLevel={currentLevel}
          totalQuestions={shuffledQuestions.length}
          levelScore={levelScore}
          maxScore={maxScore}
          onExit={handleExit}
        />
        <main className="flex-grow p-6 flex flex-col items-center justify-center pb-24">
          <QuizResults
            levelScore={levelScore}
            maxScore={maxScore}
            onRestart={handleRestart}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderQuiz
        currentLevel={currentLevel}
        totalQuestions={shuffledQuestions.length}
        levelScore={levelScore}
        maxScore={maxScore}
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
        totalQuestions={shuffledQuestions.length}
        hasAnswered={hasAnswered}
        handleNext={handleNext}
      />
    </div>
  );
};

export default Quiz;