import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Options from '../Quiz/Options';

describe('Options Component', () => {
  const mockHandleOptionClick = jest.fn();

  const defaultProps = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOption: null,
    correctAnswer: 1,
    hasAnswered: false,
    handleOptionClick: mockHandleOptionClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all options correctly', () => {
    render(<Options {...defaultProps} />);
    defaultProps.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('calls handleOptionClick with correct index when an option is clicked', () => {
    render(<Options {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(mockHandleOptionClick).toHaveBeenCalledTimes(1);
    expect(mockHandleOptionClick).toHaveBeenCalledWith(0);
  });

  test('disables all buttons when hasAnswered is true', () => {
    render(<Options {...defaultProps} hasAnswered={true} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  test('applies the correct styles when hasAnswered is true and the correct answer is selected', () => {
    render(
      <Options
        {...defaultProps}
        hasAnswered={true}
        selectedOption={1}
        correctAnswer={1}
      />
    );

    const correctButton = screen.getByText('Option 2');
    expect(correctButton).toHaveClass('bg-green-500');
  });

  test('applies the correct styles when hasAnswered is true and an incorrect answer is selected', () => {
    render(
      <Options
        {...defaultProps}
        hasAnswered={true}
        selectedOption={0}
        correctAnswer={1}
      />
    );

    const incorrectButton = screen.getByText('Option 1');
    const correctButton = screen.getByText('Option 2');

    expect(incorrectButton).toHaveClass('bg-red-500');
    expect(correctButton).toHaveClass('bg-green-500');
  });

  test('applies gray styles to unselected options when hasAnswered is true', () => {
    render(
      <Options
        {...defaultProps}
        hasAnswered={true}
        selectedOption={0}
        correctAnswer={1}
      />
    );

    const unselectedButton = screen.getByText('Option 3');
    expect(unselectedButton).toHaveClass('bg-gray-300');
  });

  test('applies hover styles when hasAnswered is false', () => {
    render(<Options {...defaultProps} />);
    const button = screen.getByText('Option 1');
    expect(button).toHaveClass('hover:bg-blue-600');
  });
});
