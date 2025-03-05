import { useState, useEffect } from "react";
import { getUsers, deleteUser, updateUser, addUser } from "../models/UserModel";

export const useUsers = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar los errores

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers(); // Llamada a la API para obtener usuarios
        setUsers(data); // Guardamos los usuarios en el estado
      } catch (err) {
        setError("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Eliminar usuario
  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId); // Llamada a la API para eliminar un usuario
      if (result) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Filtramos el usuario eliminado del estado
      }
    } catch (err) {
      setError(`Error al eliminar el usuario: ${err.message}`);
    }
  };

  // Actualizar usuario
  const handleUpdateUser = async (userId, userData) => {
    try {
      const dataToUpdate = {
        name: userData.name,
        email: userData.email,
        perfil: userData.perfil,
        activo: userData.activo === 'true' || userData.activo === true ? 1 : 0 // Convertir a 1 o 0
      };

      // Solo incluimos la contraseña si se proporcionó una nueva
      if (userData.password && userData.password.trim() !== '') {
        dataToUpdate.password = userData.password;
      }


      const updatedUser = await updateUser(userId, dataToUpdate);
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? {
            ...user, 
            ...updatedUser,
            activo: Boolean(updatedUser.activo) // Convertir de nuevo a booleano para el frontend
          } : user
        )
      );
      
      return updatedUser;
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      throw err;
    }
  };

  // Agregar usuario
  const handleAddUser = async (userData) => {
    try {
      if (!userData.password) {
        throw new Error("La contraseña es obligatoria");
      }

      // Asegurarnos que el campo activo es un booleano
      const dataToSend = {
        ...userData,
        activo: userData.activo === 'true' || userData.activo === true ? 1 : 0
      };

      const response = await addUser(dataToSend);
      
      if (response && response.user) {
        setUsers(prevUsers => [...prevUsers, response.user]);
        return response.user;
      } else {
        throw new Error("Error al crear el usuario");
      }
    } catch (err) {
      setError(`Error al agregar el usuario: ${err.message}`);
      throw err;
    }
  };

  return { users, loading, error, handleDeleteUser, handleUpdateUser, handleAddUser };
};
