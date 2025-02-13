import { useState, useEffect } from "react";

// Hook para interactuar con la API de usuarios
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users");
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        setUsers(data.data); // Guardamos los usuarios en el estado
      } catch (err) {
        setError("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Eliminar usuario
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
      } else {
        throw new Error('No se pudo eliminar el usuario');
      }
    } catch (err) {
      setError(`Error al eliminar el usuario: ${err.message}`);
    }
  };

  // Actualizar usuario
  const updateUser = async (userId, userData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'PUT', // O 'PATCH' si solo se actualizan algunos campos
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      const updatedUser = await response.json();

      // Actualizamos la lista de usuarios en el estado
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );

      return updatedUser;
    } catch (err) {
      throw new Error(`Error al actualizar usuario: ${err.message}`);
    }
  };

  // Agregar usuario
  const addUser = async (userData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el usuario');
      }

      const newUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, newUser]); // Agregamos el nuevo usuario al estado

      return newUser;
    } catch (err) {
      throw new Error(`Error al agregar usuario: ${err.message}`);
    }
  };

  return { users, loading, error, deleteUser, updateUser, addUser };
};
