import React, { useState } from "react";
import { useUsers } from "../../hook/UseUsers"; // Hook que maneja la API
import Loading from "../../components/Loading";
import DetallesUsuario from "../../components/DetallesUsuario"; // Importar el nuevo componente
import { validateUserForm } from '../../core/validateForms';

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

          {users.map((user) => (
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
        <DetallesUsuario 
          user={usuarioSeleccionado} 
          onCancel={handleVolver}
        />
      )}
    </div>
  );
}

// Componente para añadir y editar usuario
const FormularioUsuario = ({ user, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    perfil: user?.perfil || '',
    activo: user?.activo ?? true
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { errors, isValid } = validateUserForm(form, user);
    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const dataToSubmit = {
        ...form,
        activo: Boolean(form.activo) // Asegurarse de que sea booleano
      };
      
      // Mantener la lógica existente para email y contraseña
      if (user && user.email === form.email) {
        delete dataToSubmit.email;
      }

      if (user && !form.password.trim()) {
        delete dataToSubmit.password;
      }

      await onSubmit(dataToSubmit);
      onCancel();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
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
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Nombre"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="ejemplo@gmail.com"
            type="email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Contraseña {user ? '(dejar en blanco para mantener la actual)' : '*'}
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            type="password"
            placeholder={user ? 'Dejar en blanco para mantener la actual' : 'Contraseña'}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Perfil</label>
          <select
            name="perfil"
            value={form.perfil}
            onChange={handleChange}
            className={`form-control ${errors.perfil ? 'is-invalid' : ''}`}
          >
            <option value="">Seleccione un perfil</option>
            <option value="administrador">Administrador</option>
            <option value="entrenador">Entrenador</option>
            <option value="director">Director</option>
            <option value="periodista">Periodista</option>
          </select>
          {errors.perfil && <div className="invalid-feedback">{errors.perfil}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            name="activo"
            value={form.activo.toString()} // Convertir a string para el select
            onChange={handleChange}
            className="form-control"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default Usuarios;
