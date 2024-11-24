import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WelcomeSection } from '../Home/Welcome/WelcomeSection';

global.React = React;

// Mock para el componente VideoPlayer
jest.mock('../Videos/VideoPlayer', () => {
  const MockVideoPlayer = ({ videoId }: { videoId: string }) => {
    return <div data-testid="mock-video-player">Video Player ID: {videoId}</div>;
  };
  return MockVideoPlayer;
});

describe('WelcomeSection', () => {
  // Prueba 1: Renderización básica
  test('renders WelcomeSection with correct content', () => {
    const { getByText, getByTestId } = render(<WelcomeSection />);

    // Verificar que el título está presente
    expect(getByText(/¡Te damos la bienvenida!/i)).toBeInTheDocument();

    // Verificar que el párrafo está presente
    expect(
      getByText(
        /BEPRO es una plataforma interactiva diseñado para capacitar a empleados/i
      )
    ).toBeInTheDocument();

    // Verificar que el VideoPlayer mock se renderiza con el videoId correcto
    const videoPlayer = getByTestId('mock-video-player');
    expect(videoPlayer).toBeInTheDocument();
    expect(videoPlayer).toHaveTextContent('Video Player ID: i6xJ8G5__TQ');
  });

  // Prueba 2: Verificar la estructura del contenedor principal
  test('renders the main container with proper class names', () => {
    const { container } = render(<WelcomeSection />);

    // Verificar la clase del contenedor principal
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('flex gap-8 px-20');
  });
});
