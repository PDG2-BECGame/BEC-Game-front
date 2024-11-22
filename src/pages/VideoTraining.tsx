// src/pages/VideoTraining.tsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderSection from "../components/VideoTraining/HeaderSection";
import TitleSection from "../components/VideoTraining/TitleSection";
import VideoPlayer from "../components/Videos/VideoPlayer";
import DescriptionSection from "../components/VideoTraining/DescriptionSection";
import { videoData } from "../consts/video";

const VideoTraining: React.FC = () => {
    const { level } = useParams<{ level: string }>();
    const navigate = useNavigate();

    const currentLevel = level || '1'; // Nivel por defecto
    const currentVideo = videoData[currentLevel];

    if (!currentVideo) {
        return <p>No se encontró el contenido para este nivel.</p>;
    }

    const handleQuizNavigation = () => {
        navigate(`/quiz/${currentLevel}`);
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            {/* Header Section */}
            <HeaderSection
                title={currentVideo.headerTitle}
                onButtonClick={handleQuizNavigation}
            />

            {/* Contenido principal */}
            <div className="p-6 max-w-5xl md:mx-0">
                <TitleSection title={currentVideo.title} />

                {/* Video Player */}
                <div className="mt-6">
                    <VideoPlayer videoId={currentVideo.videoId} width="100%" height="450" />
                </div>

                {/* Descripción debajo del video */}
                <div className="mt-6">
                    <DescriptionSection
                        title={currentVideo.descriptionTitle}
                        date={currentVideo.date}
                        description={currentVideo.description}
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoTraining;
