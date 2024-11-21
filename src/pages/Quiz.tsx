import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { questionsByLevel } from "../consts/questions.d";

const Quiz: React.FC = () => {
    const { level } = useParams<{ level: string }>();
    const currentLevel = parseInt(level || "1", 10);
    const questions = questionsByLevel[currentLevel];

    if (!questions) {
        return <p>No hay preguntas para este nivel.</p>;
    }

    // Estados
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [hasAnswered, setHasAnswered] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    const currentQuestion = questions[currentQuestionIndex];

    // Maneja la selección de una opción
    const handleOptionClick = (index: number) => {
        if (hasAnswered) return; // Evita cambiar la respuesta después de seleccionar
        setSelectedOption(index);
        const correct = index === currentQuestion.answer;
        setIsCorrect(correct);
        setHasAnswered(true);

        if (correct) {
            setScore((prevScore) => prevScore + 1); // Actualiza la puntuación
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
            alert(`¡Has completado el nivel! Tu puntuación es ${score}/${questions.length}`);
            // Aquí puedes redirigir al usuario o reiniciar el cuestionario
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Nivel {currentLevel}</h1>
                <p>Puntuación: {score}/{questions.length}</p>
                <button className="text-red-200 font-semibold hover:text-red-500 transition">X</button>
            </header>

            {/* Contenido principal */}
            <main className="flex-grow p-6 flex flex-col items-center justify-center pb-24">
                {/* Pregunta */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">{currentQuestion.question}</h2>
                </div>

                {/* Opciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    {currentQuestion.options.map((option, index) => {
                        // Determina el color del botón según la respuesta
                        let bgColor = "bg-blue-500 hover:bg-blue-600";
                        if (hasAnswered) {
                            if (index === currentQuestion.answer) {
                                bgColor = "bg-green-500";
                            } else if (index === selectedOption) {
                                bgColor = "bg-red-500";
                            } else {
                                bgColor = "bg-gray-300";
                            }
                        }
                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={hasAnswered}
                                className={`p-4 rounded-lg shadow text-white transition ${bgColor}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {/* Feedback de la respuesta */}
                {hasAnswered && (
                    <p className="mt-4 text-lg font-semibold">
                        {isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta"}
                    </p>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white p-4 shadow-md flex justify-between items-center sticky bottom-0">
                <p className="text-gray-700">
                    Pregunta {currentQuestionIndex + 1} de {questions.length}
                </p>
                <button
                    onClick={handleNext}
                    disabled={!hasAnswered}
                    className={`${
                        hasAnswered
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-300 cursor-not-allowed"
                    } text-white px-4 py-2 rounded-lg transition`}
                >
                    Siguiente
                </button>
            </footer>
        </div>
    );
};

export default Quiz;
