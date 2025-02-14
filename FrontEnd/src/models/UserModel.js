export const getUsers = async () => {
  try {
    const response = await fetch("/api/users"); // Solicitud relativa
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    return data.data; // Devuelve la lista de usuarios
  } catch (err) {
    throw new Error("Error al obtener los usuarios: " + err.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`, { // Solicitud relativa
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('No se pudo eliminar el usuario');
    }
    return true; // Devuelve true si el usuario se eliminó correctamente
  } catch (err) {
    throw new Error(`Error al eliminar el usuario: ${err.message}`);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`/api/users/${userId}`, { // Solicitud relativa
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el usuario');
    }
    const updatedUser = await response.json();
    return updatedUser; // Devuelve el usuario actualizado
  } catch (err) {
    throw new Error(`Error al actualizar el usuario: ${err.message}`);
  }
};

export  const addUser = async (userData) => {
  try {
    const response = await fetch("/api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Si la respuesta no es ok, lanzamos un error
    if (!response.ok) {
      throw new Error('Error al agregar el usuario');
    }

    // Devuelve la respuesta como JSON
    const newUser = await response.json(); // Lee y convierte la respuesta en JSON directamente
    return newUser;
  } catch (err) {
    console.error("Error al agregar el usuario:", err.message);
    throw new Error(`Error al agregar el usuario: ${err.message}`);
  }
};

