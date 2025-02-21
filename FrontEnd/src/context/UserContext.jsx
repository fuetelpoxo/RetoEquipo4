// src/context/UserContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (user) => {
    setLoggedInUser(user); // Guardamos al usuario en el estado, sin persistir en el localStorage
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
