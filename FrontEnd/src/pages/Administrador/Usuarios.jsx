import React, { useState } from "react";
import { useUsers } from "../../models/UseUsers"; // Hook que maneja la API
import Loading from "../../components/Loading";

// Componente principal de gestión de usuarios
function Usuarios() {
  const { users, loading, error, handleDeleteUser, handleAddUser, handleUpdateUser } = useUsers();
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
            <div className="col">Nombre</div>
            <div className="col">Email</div>
            <div className="col">Perfil</div>
            <div className="col">Estado</div>
            <div className="col">Acciones</div>
          </div>
          

      
          { users.map((user) => (
            <div className="row border-bottom py-2" key={user.id}> {/* Usa email o id para clave */}
              <div className="col">{user.name}</div>
              <div className="col">{user.email}</div>
              <div className="col">{user.perfil}</div>
              <div className="col">{user.activo ? "Activo" : "Inactivo"}</div>

              <div className="col">
                <button onClick={() => handleDetalles(user)} className="btn btn-black btn-sm me-2">
                  <i className="fa fa-eye"></i>
                </button>
                <button onClick={() => handleEditar(user)} className="btn btn-black btn-sm me-2">
                  <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-black btn-sm" onClick={() => handleDeleteUser(user.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {vista === "añadir" && (
        <FormularioUsuario onSubmit={handleAddUser} onCancel={handleVolver} />
      )}
      {vista === "editar" && usuarioSeleccionado && (
        <FormularioUsuario
          user={usuarioSeleccionado}
          onSubmit={(userData) => handleUpdateUser(usuarioSeleccionado.id, userData)}
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
  const [form, setForm] = useState(user || { name: "", email: "", password: "", perfil: "", activo: true });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onCancel();
  };

  return (
    <div>
      <h2>{user ? "Editar Usuario" : "Añadir Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Nombre"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            type="email"
            required
          />
        </div>
        {!user && (
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Contraseña"
              type="password"
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Perfil</label>
          <input
            name="perfil"
            value={form.perfil}
            onChange={handleChange}
            className="form-control"
            placeholder="Perfil"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado (Activo)</label>
          <select
            name="activo"
            value={form.activo}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>
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
      <p><strong>Estado:</strong> {user.activo ? "Activo" : "Inactivo"}</p>
      <button className="btn btn-secondary" onClick={onCancel}>Volver</button>
    </div>
  );
};

export default Usuarios;
