import React from 'react';

const DetallesUsuario = ({ user, onCancel }) => {
  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h2 className="mb-0">Detalles del Usuario</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Nombre:</strong>
            </div>
            <div className="col-md-9">
              {user.name}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Email:</strong>
            </div>
            <div className="col-md-9">
              {user.email}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Perfil:</strong>
            </div>
            <div className="col-md-9">
              <span className={`badge ${
                user.perfil === 'administrador' ? 'bg-danger' : 
                user.perfil === 'entrenador' ? 'bg-success' : 
                user.perfil === 'director' ? 'bg-primary' : 
                'bg-info'
              }`}>
                {user.perfil}
              </span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Estado:</strong>
            </div>
            <div className="col-md-9">
              <span className={`badge ${user.activo ? 'bg-success' : 'bg-danger'}`}>
                {user.activo ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <div className="text-end mt-4">
            <button className="btn btn-secondary" onClick={onCancel}>
              <i className="fa fa-arrow-left me-2"></i>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesUsuario;