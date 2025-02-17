import React, { useState, useEffect, useCallback } from 'react';
import { useEquipos } from '../hook/UseEquipos';

const DetallesEquipo = ({ equipo, onCancel }) => {
  const { fetchJugadoresByEquipo } = useEquipos();
  const [jugadoresEquipo, setJugadoresEquipo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarJugadores = useCallback(async () => {
    try {
      setLoading(true);
      const jugadores = await fetchJugadoresByEquipo(equipo.id);
      setJugadoresEquipo(jugadores);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [equipo.id, fetchJugadoresByEquipo]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const jugadores = await fetchJugadoresByEquipo(equipo.id);
        if (mounted) {
          setJugadoresEquipo(jugadores);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [equipo.id, fetchJugadoresByEquipo]);

  if (loading) {
    return (
      <div className="container mt-3">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h2 className="mb-0">Detalles del Equipo</h2>
        </div>
        <div className="card-body">
          {/* Detalles del equipo */}
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Nombre:</strong>
            </div>
            <div className="col-md-9">
              {equipo.nombre}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Grupo:</strong>
            </div>
            <div className="col-md-9">
              <span className="badge bg-info">
                {equipo.grupo}
              </span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Fecha de Creación:</strong>
            </div>
            <div className="col-md-9">
              {new Date(equipo.fechaCreacion).toLocaleDateString()}
            </div>
          </div>

          {/* Sección de jugadores */}
          <div className="row mt-4">
            <div className="col-12">
              <h4>Jugadores del Equipo</h4>
              {loading ? (
                <div className="text-center">Cargando jugadores...</div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <div className="table-responsive">
                  <div className="row bg-dark text-white py-2">
                    <div className="col">Nombre</div>
                    <div className="col">Tipo</div>
                    <div className="col">DNI</div>
                  </div>
                  {jugadoresEquipo.length > 0 ? (
                    jugadoresEquipo.map(jugador => (
                      <div className="row border-bottom py-2" key={jugador.id}>
                        <div className="col">
                          {`${jugador.nombre} ${jugador.apellido1} ${jugador.apellido2 || ''}`}
                        </div>
                        <div className="col">
                          <span className={`badge ${
                            jugador.tipo === 'capitan' ? 'bg-danger' :
                            jugador.tipo === 'entrenador' ? 'bg-success' :
                            'bg-primary'
                          }`}>
                            {jugador.tipo}
                          </span>
                        </div>
                        <div className="col">{jugador.dni}</div>
                      </div>
                    ))
                  ) : (
                    <div className="row">
                      <div className="col text-center py-3">
                        No hay jugadores registrados en este equipo
                      </div>
                    </div>
                  )}
                </div>
              )}
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

export default React.memo(DetallesEquipo);