import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Para simular rutas
import Sidebar from '../Sidebar/Sidebar';

// Prueba 1: Renderización básica del componente Sidebar
test('renders Sidebar correctly', () => {
  const { getByAltText, getByText } = render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );

  // Verifica que el logo esté presente
  expect(getByAltText('Logo')).toBeInTheDocument();

  // Verifica que los enlaces principales estén presentes
  expect(getByText('Inicio')).toBeInTheDocument();
  expect(getByText('Perfil')).toBeInTheDocument();
  expect(getByText('Clasificado')).toBeInTheDocument();
  expect(getByText('Ayuda')).toBeInTheDocument();
});

// Prueba 2: Verificar las rutas de los enlaces
test('Sidebar links have correct routes', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );


  expect(getByText('Inicio').closest('a')).toHaveAttribute('href', '/');
  expect(getByText('Perfil').closest('a')).toHaveAttribute('href', '/profile');
  expect(getByText('Clasificado').closest('a')).toHaveAttribute('href', '/classification');
  expect(getByText('Ayuda').closest('a')).toHaveAttribute('href', '/help');
});
