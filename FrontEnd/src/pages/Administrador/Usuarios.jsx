import React, { useState } from "react";
import { useUsers } from "../../models/UserViewModel"; // Hook que maneja la API
import Loading from "../../components/loading";

function Usuarios() {
  const { users, loading, error, deleteUser, addUser, updateUser } = useUsers(); 
  const [vista, setVista] = useState("listado"); // Estado para controlar la vista
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Estado para editar/ver detalles

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Función para manejar la edición
  const handleEditar = (user) => {
    setUsuarioSeleccionado(user);
    setVista("editar");
  };

  // Función para manejar la vista de detalles
  const handleDetalles = (user) => {
    setUsuarioSeleccionado(user);
    setVista("detalles");
  };

  // Función para manejar la vista de añadir
  const handleAñadir = () => {
    setVista("añadir");
  };

  // Volver a la lista
  const handleVolver = () => {
    setVista("listado");
    setUsuarioSeleccionado(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Usuarios</h1>

      {/* Renderizado condicional basado en la vista */}
      {vista === "listado" && (
        <>
          <button onClick={handleAñadir} className="btn btn-success mb-4">
            <i className="fa fa-plus"></i> Añadir Usuario
          </button>

          <div className="row bg-dark text-white">
            <div className="col">ID</div>
            <div className="col">Nombre</div>
            <div className="col">Email</div>
            <div className="col">Perfil</div>
            <div className="col">Acciones</div>
          </div>

          {users.map((user) => (
            <div className="row border-bottom py-2" key={user.id}>
              <div className="col">{user.id}</div>
              <div className="col">{user.name}</div>
              <div className="col">{user.email}</div>
              <div className="col">{user.perfil}</div>

              <div className="col">
                <button onClick={() => handleDetalles(user)} className="btn btn-info btn-sm me-2">
                  <i className="fa fa-eye"></i>
                </button>
                <button onClick={() => handleEditar(user)} className="btn btn-warning btn-sm me-2">
                  <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {vista === "añadir" && <FormularioUsuario onSubmit={addUser} onCancel={handleVolver} />}
      {vista === "editar" && usuarioSeleccionado && (
        <FormularioUsuario
          user={usuarioSeleccionado}
          onSubmit={updateUser}
          onCancel={handleVolver}
        />
      )}
      {vista === "detalles" && usuarioSeleccionado && (
        <DetallesUsuario user={usuarioSeleccionado} onCancel={handleVolver} />
      )}
    </div>
  );
}

// Componente para añadir y editar usuario
const FormularioUsuario = ({ user, onSubmit, onCancel }) => {
  const [form, setForm] = useState(user || { name: "", email: "", perfil: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onCancel(); // Vuelve al listado después de enviar
  };

  return (
    <div>
      <h2>{user ? "Editar Usuario" : "Añadir Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="perfil" value={form.perfil} onChange={handleChange} placeholder="Perfil" />
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

// Componente para ver detalles del usuario
const DetallesUsuario = ({ user, onCancel }) => {
  return (
    <div>
      <h2>Detalles de {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Perfil:</strong> {user.perfil}</p>
      <button className="btn btn-secondary" onClick={onCancel}>Volver</button>
    </div>
  );
};

export default Usuarios;
