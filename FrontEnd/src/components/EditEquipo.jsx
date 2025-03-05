import React, { useState, useEffect } from 'react';
import { getJugadoresByEquipo } from '../models/EquipoModel';

const EditEquipo = ({ equipo, onSubmit, onCancel }) => {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    nombre: equipo.nombre || '',
    grupo: equipo.grupo || '',
  });

  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        setLoading(true);
        const jugadoresData = await getJugadoresByEquipo(equipo.id);
        setJugadores(jugadoresData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los jugadores: ' + err.message);
        setLoading(false);
      }
    };

    cargarJugadores();
  }, [equipo.id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditJugador = (jugador) => {
    console.log('Editar jugador:', jugador);
  };

  if (loading) return <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando jugadores...</p>
          </div>
        </div>
      </div>
    </div>
  </div>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Equipo: {equipo.nombre}</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre del Equipo</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Grupo</label>
                <input
                  type="text"
                  className="form-control"
                  name="grupo"
                  value={form.grupo}
                  onChange={handleChange}
                />
              </div>

              <h6 className="mt-4">Jugadores del Equipo</h6>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>DNI</th>
                      <th>Email</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jugadores.map(jugador => (
                      <tr key={jugador.id}>
                        <td>{jugador.nombre}</td>
                        <td>{`${jugador.apellido1} ${jugador.apellido2 || ''}`}</td>
                        <td>{jugador.dni}</td>
                        <td>{jugador.email}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEditJugador(jugador)}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={() => onSubmit(form)}>
              Guardar Cambios
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEquipo;