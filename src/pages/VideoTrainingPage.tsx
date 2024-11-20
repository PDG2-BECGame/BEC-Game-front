import React from "react";
import HeaderSection from "../components/VideoTrainingPage/HeaderSection";

const VideoTrainingPage: React.FC = () => {
    const handleQuizNavigation = () => {
        // Redirigir al quiz correspondiente
        console.log("Navegando al quiz...");
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
            <HeaderSection
                title="Nivel 1"
                onButtonClick={handleQuizNavigation}
            />
            
        </div>
    );
};

export default VideoTrainingPage;