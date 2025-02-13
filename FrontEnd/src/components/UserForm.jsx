// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de la acción

const UserForm = ({ userToEdit, onSubmit }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    perfil: '',
  });

  const navigate = useNavigate();

  // Si estamos editando, pre-llenamos los campos con la información del usuario
  useEffect(() => {
    if (userToEdit) {
      setUser({
        name: userToEdit.name,
        email: userToEdit.email,
        perfil: userToEdit.perfil,
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
    navigate('/administrador/usuarios'); // Redirigir a la lista de usuarios después de guardar
  };

  return (
    <div className="container mt-5">
      <h1>{userToEdit ? 'Editar Usuario' : 'Añadir Usuario'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            id="name"
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="perfil" className="form-label">Perfil</label>
          <input
            type="text"
            id="perfil"
            className="form-control"
            name="perfil"
            value={user.perfil}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {userToEdit ? 'Guardar cambios' : 'Añadir usuario'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
