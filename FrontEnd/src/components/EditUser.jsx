// src/pages/Administrador/EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../../components/UserForm'; // Importamos el formulario

function EditUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Llamas a tu API para obtener los datos del usuario
    const fetchUser = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [userId]);

  const editUser = (userData) => {
    // Aquí llamas a tu API para editar el usuario
    console.log('Editar usuario:', userData);
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <UserForm onSubmit={editUser} userToEdit={user} />
    </div>
  );
}

export default EditUser;
