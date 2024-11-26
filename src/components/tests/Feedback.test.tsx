import React from 'react';
import { render, screen } from '@testing-library/react';
import Feedback from '../Quiz/Feedback';

describe('Feedback Component', () => {
  test('renders nothing when isCorrect is null', () => {
    const { container } = render(<Feedback isCorrect={null} feedbackMessage="No feedback" />);
    expect(container.firstChild).toBeNull();
  });

  test('renders "¡Respuesta correcta!" when isCorrect is true', () => {
    render(<Feedback isCorrect={true} feedbackMessage="¡Buen trabajo!" />);
    expect(screen.getByText('¡Respuesta correcta!')).toBeInTheDocument();
    expect(screen.getByText('¡Buen trabajo!')).toBeInTheDocument();
  });

  test('renders "Respuesta incorrecta" when isCorrect is false', () => {
    render(<Feedback isCorrect={false} feedbackMessage="Inténtalo de nuevo" />);
    expect(screen.getByText('Respuesta incorrecta')).toBeInTheDocument();
    expect(screen.getByText('Inténtalo de nuevo')).toBeInTheDocument();
  });
});
