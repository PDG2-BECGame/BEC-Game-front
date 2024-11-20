import React from "react";
import HeaderSection from "../components/VideoTraining/HeaderSection";
import TitleSection from "../components/VideoTraining/TitleSection";

const VideoTraining: React.FC = () => {
    const handleQuizNavigation = () => {
        console.log("Navegando al quiz...");
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            {/* Header Section */}
            <HeaderSection
                title="Nivel 1"
                onButtonClick={handleQuizNavigation}
            />

            {/* Eliminamos cualquier sombra innecesaria aquí */}
            <div className="p-6 max-w-5xl mx-auto">
                <TitleSection title="Clase 1" />
                <p className="text-lg text-gray-700 mt-4">
                    Aquí puedes ver el video de entrenamiento relacionado con este nivel.
                </p>
            </div>
        </div>
    );
};

export default VideoTraining;
