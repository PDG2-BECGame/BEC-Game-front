import React from 'react';
import { render, screen } from '@testing-library/react';
import Feedback from '../Quiz/Feedback';

describe('Feedback Component', () => {
    test('renders nothing when hasAnswered is false', () => {
      const { container } = render(<Feedback isCorrect={null} hasAnswered={false} />);
      expect(container.firstChild).toBeNull();
    });
  
    test('renders "¡Respuesta correcta!" when isCorrect is true and hasAnswered is true', () => {
      render(<Feedback isCorrect={true} hasAnswered={true} />);
      expect(screen.getByText('¡Respuesta correcta!')).toBeInTheDocument();
    });
  
    test('renders "Respuesta incorrecta" when isCorrect is null but hasAnswered is true', () => {
      render(<Feedback isCorrect={null} hasAnswered={true} />);
      expect(screen.queryByText('¡Respuesta correcta!')).not.toBeInTheDocument();
      expect(screen.getByText('Respuesta incorrecta')).toBeInTheDocument();
    });

  });
