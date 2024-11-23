import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext'; // Importamos el UserProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider> {/* Envolvemos App con UserProvider */}
      <App />
    </UserProvider>
  </StrictMode>,
);