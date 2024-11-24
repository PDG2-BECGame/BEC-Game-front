import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Necesario para usar useNavigate
import { UserContext } from '../../context/UserContext';
import Level from '../Home/Roadmap/Level';

// Mock para useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock de useNavigate
  }));
  
  const mockNavigate = jest.requireMock('react-router-dom').useNavigate;
  
  describe('Level Component', () => {
    const mockUser = {
      levelScores: {
        1: 400, // Puntaje del nivel actual
      },
    };
  
    const renderWithContext = (component: React.ReactNode, contextValue: any) => {
      return render(
        <UserContext.Provider value={contextValue}>
          <BrowserRouter>{component}</BrowserRouter>
        </UserContext.Provider>
      );
    };
  
    test('renders Level with correct content', () => {
      renderWithContext(
        <Level
          id={1}
          nivel="Nivel 1"
          titulo="Introducción"
          descripcion="Descripción del nivel 1"
          logo="logo1.png"
        />,
        { user: mockUser }
      );
  
      expect(screen.getByText('Nivel 1')).toBeInTheDocument();
      expect(screen.getByText('Introducción')).toBeInTheDocument();
      expect(screen.getByText('Descripción:')).toBeInTheDocument();
      expect(screen.getByText('Puntos: 400 / 500')).toBeInTheDocument();
      expect(screen.getByAltText('Logo Nivel 1')).toHaveAttribute('src', 'logo1.png');
      expect(screen.getByRole('button', { name: /Continuar/i })).toBeInTheDocument();
    });
  
    test('shows "Completado" if the level is completed', () => {
      const completedUser = {
        levelScores: {
          1: 500, // Puntaje suficiente para completar el nivel
        },
      };
  
      renderWithContext(
        <Level
          id={1}
          nivel="Nivel 1"
          titulo="Introducción"
          descripcion="Descripción del nivel 1"
          logo="logo1.png"
        />,
        { user: completedUser }
      );
  
      expect(screen.getByText('Completado')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Repetir Nivel/i })).toBeInTheDocument();
    });
  
    test('navigates to the correct route when the button is clicked', () => {
      const mockNavigateFn = jest.fn(); // Crear mock para navigate
      mockNavigate.mockImplementation(() => mockNavigateFn);
  
      renderWithContext(
        <Level
          id={1}
          nivel="Nivel 1"
          titulo="Introducción"
          descripcion="Descripción del nivel 1"
          logo="logo1.png"
        />,
        { user: mockUser }
      );
  
      const button = screen.getByRole('button', { name: /Continuar/i });
      fireEvent.click(button);
  
      // Verificar que navigate fue llamado con la ruta correcta
      expect(mockNavigateFn).toHaveBeenCalledWith('/videoTraining/1');
    });
  
    test('returns null if UserContext is not available', () => {
      const { container } = renderWithContext(
        <Level
          id={1}
          nivel="Nivel 1"
          titulo="Introducción"
          descripcion="Descripción del nivel 1"
          logo="logo1.png"
        />,
        null // Sin UserContext
      );
  
      expect(container.firstChild).toBeNull();
    });
  });