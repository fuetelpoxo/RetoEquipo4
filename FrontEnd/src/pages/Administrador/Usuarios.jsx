import React, { useState } from "react";
import { useUsers } from "../../hook/UseUsers";
import Loading from "../../components/Loading";
import DetallesUsuario from "../../components/DetallesUsuario";
import EditUser from "../../components/EditUser";
import AddUser from "../../components/AddUser";

function Usuarios() {
  const { users, loading, error, handleDeleteUser, handleAddUser, handleUpdateUser } = useUsers();
  const [vista, setVista] = useState("listado");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const handleEditar = (user) => {
    setUsuarioSeleccionado(user);
    setVista("editar");
  };

  const handleDetalles = (user) => {
    setUsuarioSeleccionado(user);
    setVista("detalles");
  };

  const handleAñadir = () => {
    setVista("añadir");
  };

  const handleVolver = () => {
    setVista("listado");
    setUsuarioSeleccionado(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Usuarios</h1>

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
            <div className="row border-bottom py-2" key={user.id}>
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
        <AddUser 
          onSubmit={handleAddUser}
          onCancel={handleVolver}
        />
      )}

      {vista === "editar" && usuarioSeleccionado && (
        <EditUser
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

export default Usuarios;
