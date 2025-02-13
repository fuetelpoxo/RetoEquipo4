// src/pages/Administrador/AddUser.jsx
import React from 'react';
import UserForm from '../../components/UserForm'; // Importamos el formulario

function AddUser() {
  const addUser = (user) => {
    // Aquí llamas a tu API para añadir el usuario
    console.log('Añadir usuario:', user);
  };

  return (
    <div>
      <UserForm onSubmit={addUser} userToEdit={null} />
    </div>
  );
}

export default AddUser;
