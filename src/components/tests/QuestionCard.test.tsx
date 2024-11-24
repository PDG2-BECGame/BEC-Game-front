import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionCard from '../Quiz/QuestionCard';

// Prueba 1: Renderizar el componente con solo texto de la pregunta
test('renders QuestionCard with question text only', () => {
  const questionText = 'What is the capital of France?';
  const { getByText, queryByAltText } = render(<QuestionCard questionText={questionText} />);

  // Verificar que el texto de la pregunta se renderiza
  expect(getByText(questionText)).toBeInTheDocument();

  // Verificar que la imagen no se renderiza
  expect(queryByAltText('Question Image')).not.toBeInTheDocument();
});

// Prueba 2: Renderizar el componente con texto de la pregunta y una imagen
test('renders QuestionCard with question text and image', () => {
  const questionText = 'What is the capital of France?';
  const image = 'https://example.com/image.jpg';
  const { getByText, getByAltText } = render(<QuestionCard questionText={questionText} image={image} />);

  // Verificar que el texto de la pregunta se renderiza
  expect(getByText(questionText)).toBeInTheDocument();

  // Verificar que la imagen se renderiza con el atributo alt correcto
  const imageElement = getByAltText('Question Image');
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', image);
});

// Prueba 3: Renderizar el componente sin texto de la pregunta
test('renders QuestionCard without question text', () => {
    const { container, getByText } = render(<QuestionCard questionText="" />);
  
    // Verificar que el contenedor del componente existe
    expect(container.firstChild).toBeInTheDocument();
  
    // Verificar que el encabezado <h2> está presente pero vacío
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading).toBeEmptyDOMElement();
  
    // Asegurarse de que no haya texto visible
    expect(() => getByText(/./)).toThrow();
  });
  
