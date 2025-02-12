// src/core/loginUsers.jsx
import { users } from "../data/users"; // Importamos el archivo de usuarios

export const verifyUser = (username, password) => {
  // Buscar el usuario por nombre de usuario y contraseña
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return user; // Retorna el usuario si se encuentra, de lo contrario, retorna undefined
};
