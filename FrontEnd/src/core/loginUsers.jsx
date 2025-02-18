// src/core/loginUsers.jsx
import { users } from "../data/users"; // Importamos el archivo de usuarios

export const verifyUser = (username, password) => {
  if (!username || !password) {
    console.error('Por favor ingrese ambos campos: nombre de usuario y contraseña');
    return null;
  }

  // Buscar el usuario por nombre de usuario y contraseña
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    console.error('Usuario o contraseña incorrectos');
    return null;
  }

  // Si el usuario es encontrado, retornamos los detalles del usuario
  return user;
};
