import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayer from '../Videos/VideoPlayer';

// Mock de 'react-youtube' en un archivo JavaScript
jest.mock('react-youtube', () => {
    const YouTube: React.FC<{ videoId: string; opts: { width: string; height: string } }> = ({
      videoId,
      opts,
    }) => {
      if (!videoId) {
        throw new Error("videoId is required");
      }
  
      return (
        <iframe
          title="YouTube video player"
          width={opts?.width || '600'}
          height={opts?.height || '350'}
          src={`https://www.youtube.com/embed/${videoId}`}
        />
      );
    };
  
    return YouTube;
  });

// Prueba 1: Renderización básica del componente VideoPlayer
test('renders VideoPlayer with correct videoId', () => {
  const videoId = 'testVideoId';
  const { getByTitle } = render(<VideoPlayer videoId={videoId} />);

  const iframeElement = getByTitle('YouTube video player');
  expect(iframeElement).toBeInTheDocument();
  expect(iframeElement).toHaveAttribute('src', expect.stringContaining(videoId));
});

// Prueba 2: Renderización con dimensiones predeterminadas
test('renders VideoPlayer with default width and height', () => {
  const { getByTitle } = render(<VideoPlayer videoId="testVideoId" />);

  const iframeElement = getByTitle('YouTube video player');
  expect(iframeElement).toHaveAttribute('width', '600');
  expect(iframeElement).toHaveAttribute('height', '350');
});

// Prueba 3: Renderización con dimensiones personalizadas
test('renders VideoPlayer with custom width and height', () => {
  const customWidth = '800';
  const customHeight = '450';
  const { getByTitle } = render(
    <VideoPlayer videoId="testVideoId" width={customWidth} height={customHeight} />
  );

  const iframeElement = getByTitle('YouTube video player');
  expect(iframeElement).toHaveAttribute('width', customWidth);
  expect(iframeElement).toHaveAttribute('height', customHeight);
});
