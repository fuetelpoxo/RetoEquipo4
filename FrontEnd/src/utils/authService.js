import users from '../assets/users.json'; // Ruta al archivo JSON de usuarios

// Función que valida las credenciales
export const authenticateUser = (username, password) => {
  // Busca si el usuario y la contraseña coinciden en el archivo JSON
  const user = users.find(user => user.username === username && user.password === password);
  
  return user; // Devuelve el usuario si es encontrado, o undefined si no
};
