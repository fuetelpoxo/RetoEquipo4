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
    

    // Si el email no ha cambiado, lo eliminamos de los datos a actualizar
    const currentUser = await fetch(`/api/users/${userId}`).then(res => res.json());
    if (currentUser.email === userData.email) {
      delete userData.email;//borra email antiguo si es igual al nuevo 
    }

    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el usuario');
    }

    const data = await response.json();
    return data.data || data;
  } catch (err) {
    console.error('Error en updateUser:', err);
    throw err;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await fetch("/api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al agregar el usuario');
    }

    const data = await response.json();
    return { user: data.data }; // Modificamos para devolver el formato esperado
  } catch (err) {
    console.error("Error al agregar el usuario:", err.message);
    throw new Error(`Error al agregar el usuario: ${err.message}`);
  }
};

