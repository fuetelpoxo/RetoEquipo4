import React from 'react';

const DetallesJugador = ({ jugador, onCancel }) => {
  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h2 className="mb-0">Detalles del Jugador</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Nombre:</strong>
            </div>
            <div className="col-md-9">
              {`${jugador.nombre} ${jugador.apellido1} ${jugador.apellido2 || ''}`}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>DNI:</strong>
            </div>
            <div className="col-md-9">
              {jugador.dni}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Tipo:</strong>
            </div>
            <div className="col-md-9">
              <span className={`badge ${
                jugador.tipo === 'capitan' ? 'bg-danger' :
                jugador.tipo === 'entrenador' ? 'bg-success' :
                'bg-primary'
              }`}>
                {jugador.tipo}
              </span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Equipo:</strong>
            </div>
            <div className="col-md-9">
              <span >
                {jugador.nombreEquipo}
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

export default DetallesJugador;