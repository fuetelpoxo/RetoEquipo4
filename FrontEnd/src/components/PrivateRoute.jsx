// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const PrivateRoute = ({ element, requiresAuth = true }) => {
  const { loggedInUser } = useAuth();

  // Si la ruta no requiere autenticación, mostrar el componente directamente
  if (!requiresAuth) {
    return element;
  }

  // Si requiere autenticación, verificar si el usuario está logueado
  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
