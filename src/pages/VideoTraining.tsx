import React from "react";
import HeaderSection from "../components/VideoTraining/HeaderSection";
import TitleSection from "../components/VideoTraining/TitleSection";
import VideoPlayer from "../components/Videos/VideoPlayer"; // Importa el VideoPlayer

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

            {/* Contenido principal */}
            <div className="p-6 max-w-5xl md:mx-0">
                <TitleSection title="Clase 1" />
                {/* Video Player */}
                <div className="mt-6">
                    <VideoPlayer videoId="dQw4w9WgXcQ" /> {/* Reemplaza con el ID del video */}
                </div>
            </div>
        </div>
    );
};

export default VideoTraining;