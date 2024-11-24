import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('ScrollToTop Component', () => {
  const mockScrollTo = jest.fn();

  beforeAll(() => {
    // Mock de window.scrollTo
    Object.defineProperty(global, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
    });

    // Silenciar advertencias de React Router
    jest.spyOn(console, 'warn').mockImplementation((message) => {
      if (message.includes('React Router Future Flag Warning')) return;
      console.warn(message);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls window.scrollTo when pathname changes', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/new-route' });

    render(
      <MemoryRouter initialEntries={['/new-route']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    expect(mockScrollTo).toHaveBeenCalledTimes(1);
  });
});
