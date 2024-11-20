import React from "react";
import HeaderSection from "../components/VideoTraining/HeaderSection";
import TitleSection from "../components/VideoTraining/TitleSection";

const VideoTraining: React.FC = () => {
    const handleQuizNavigation = () => {
        console.log("Navegando al quiz...");
    };

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <HeaderSection
                title="Nivel 1"
                onButtonClick={handleQuizNavigation}
            />
            <div className="p-6 mt-8 max-w-5xl mx-auto">
                <TitleSection title="Entrenamiento en Video" />
                <p className="text-lg text-gray-700 mt-4">
                    Aquí puedes ver el video de entrenamiento relacionado con este nivel.
                </p>
            </div>
        </div>
    );
};

export default VideoTraining;
