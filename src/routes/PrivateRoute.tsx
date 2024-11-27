import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Navigate to="/login" />;
  }

  const { currentUser, loading } = authContext;

  // Mostrar un indicador de carga si está cargando la información del usuario
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Redirigir al login si no hay usuario autenticado
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Redirigir a la página de verificación de correo si el correo no ha sido verificado
  if (!currentUser.emailVerified) {
    return <Navigate to="/verify-email" />;
  }

  // Renderizar los hijos si todas las verificaciones pasan
  return children;
};

export default PrivateRoute;