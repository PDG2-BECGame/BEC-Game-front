import React from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
  width?: string; // Propiedad opcional para ancho
  height?: string; // Propiedad opcional para alto
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, width = '600', height = '350' }) => {
  const opts = {
    height, // Usar altura dinámica
    width,  // Usar ancho dinámico
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default VideoPlayer;

