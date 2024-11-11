import React from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
      <p>Mira el video antes de iniciar</p>
      <p>Te daremos el contexto de la simulación</p>
    </div>
  );
};

export default VideoPlayer;
