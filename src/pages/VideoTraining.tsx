import React from "react";
import HeaderSection from "../components/VideoTraining/HeaderSection";
import TitleSection from "../components/VideoTraining/TitleSection";
import VideoPlayer from "../components/Videos/VideoPlayer";
import DescriptionSection from "../components/VideoTraining/DescriptionSection";

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
                    <VideoPlayer videoId="dQw4w9WgXcQ" width="100%" height="450" />
                </div>

                {/* Descripción debajo del video */}
                <div className="mt-6">
                    <DescriptionSection
                        title="Conciencia Crítica: Reconociendo la Amenaza del BEC"
                        date="10/10/2024"
                        description="El objetivo es enfatizar la importancia de reconocer y entender el Business Email Compromise (BEC) como una amenaza significativa en el entorno empresarial. Se busca que los usuarios comprendan las implicaciones de estos fraudes y la necesidad de estar alerta ante las tácticas que usan los estafadores."
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoTraining;
