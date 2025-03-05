// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const PrivateRoute = ({ element }) => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    // Redirige al login si no está autenticado
    return <Navigate to="/login" />;
  }

  // Renderiza el componente si está autenticado
  return element;
};

export default PrivateRoute;
