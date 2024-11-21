import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { questionsByLevel, Question } from "../consts/questions.d";

const Quiz: React.FC = () => {
    const { level } = useParams<{ level: string }>();
    const currentLevel = parseInt(level || "1", 10);
    const questions = questionsByLevel[currentLevel];

    if (!questions) {
        return <p>No hay preguntas para este nivel.</p>;
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionClick = (index: number) => {
        setSelectedOption(index);
        setIsCorrect(index === currentQuestion.answer);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            alert("¡Has completado el nivel!");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Nivel {currentLevel}</h1>
                <p>Puntuación: 0/500</p>
                <button className="text-red-200 font-semibold hover:text-red-500 transition">X</button>
            </header>

            {/* Contenido principal */}
            <main className="flex-grow p-6 flex flex-col items-center justify-center pb-24">
                {/* Pregunta */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">{currentQuestion.question}</h2>
                </div>

                {/* Respuestas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            className={`p-4 rounded-lg shadow text-white transition ${
                                selectedOption === index
                                    ? isCorrect
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white p-4 shadow-md flex justify-between items-center sticky bottom-0">
                <p className="text-gray-700">
                    Pregunta {currentQuestionIndex + 1} de {questions.length}
                </p>
                <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className={`${
                        selectedOption !== null
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
