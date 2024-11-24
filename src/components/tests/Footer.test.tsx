import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../Quiz/Footer';

describe('Footer Component', () => {
  const mockHandleNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the current question and total questions correctly', () => {
    render(
      <Footer
        currentQuestionIndex={2}
        totalQuestions={5}
        hasAnswered={false}
        handleNext={mockHandleNext}
      />
    );

    expect(screen.getByText('Pregunta 3 de 5')).toBeInTheDocument();
  });

  test('disables the "Siguiente" button when hasAnswered is false', () => {
    render(
      <Footer
        currentQuestionIndex={0}
        totalQuestions={5}
        hasAnswered={false}
        handleNext={mockHandleNext}
      />
    );

    const button = screen.getByRole('button', { name: /Siguiente/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-300 cursor-not-allowed');
  });

  test('enables the "Siguiente" button when hasAnswered is true', () => {
    render(
      <Footer
        currentQuestionIndex={0}
        totalQuestions={5}
        hasAnswered={true}
        handleNext={mockHandleNext}
      />
    );

    const button = screen.getByRole('button', { name: /Siguiente/i });
    expect(button).toBeEnabled();
    expect(button).toHaveClass('bg-blue-500 hover:bg-blue-600');
  });

  test('calls handleNext when the "Siguiente" button is clicked', () => {
    render(
      <Footer
        currentQuestionIndex={0}
        totalQuestions={5}
        hasAnswered={true}
        handleNext={mockHandleNext}
      />
    );

    const button = screen.getByRole('button', { name: /Siguiente/i });
    fireEvent.click(button);

    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });

  test('does not call handleNext when the "Siguiente" button is disabled', () => {
    render(
      <Footer
        currentQuestionIndex={0}
        totalQuestions={5}
        hasAnswered={false}
        handleNext={mockHandleNext}
      />
    );

    const button = screen.getByRole('button', { name: /Siguiente/i });
    fireEvent.click(button);

    expect(mockHandleNext).not.toHaveBeenCalled();
  });
});
