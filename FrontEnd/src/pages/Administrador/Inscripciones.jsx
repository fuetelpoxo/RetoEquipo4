import React, { useState } from 'react';
import { useInscripciones } from '../../hook/useInscripciones';
import Loading from '../../components/Loading';
import AddInscripcion from '../../components/AddInscripcion';

function Inscripciones() {
  const { inscripciones, loading, error, handleCreateInscripcion, handleUpdateInscripcion } = useInscripciones();
  const [showForm, setShowForm] = useState(false);

  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'aprobada':
        return 'bg-success';
      case 'rechazada':
        return 'bg-danger';
      default:
        return 'bg-warning text-dark';
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Inscripciones</h1>
        <button 
          className="btn btn-danger"
          onClick={() => setShowForm(true)}
        >
          Nueva Inscripción
        </button>
      </div>

      {/* Cabecera */}
      <div className="row bg-dark text-white py-2">
        <div className="col-md-2">Equipo</div>
        <div className="col-md-2">Estado</div>
        <div className="col-md-4">Comentarios</div>
        <div className="col-md-2">Fecha</div>
        <div className="col-md-2">Acciones</div>
      </div>

      {/* Lista de inscripciones */}
      {inscripciones.map(inscripcion => (
        <div key={inscripcion.id} className="row py-3 border-bottom align-items-center">
          <div className="col-md-2">
            {inscripcion.nombreEquipo || 'Sin equipo'}  {/* Asegúrate de usar nombreEquipo */}
          </div>
          <div className="col-md-2">
            <span className={`badge ${getEstadoClass(inscripcion.estado)}`}>
              {inscripcion.estado}
            </span>
          </div>
          <div className="col-md-4">
            {inscripcion.comentarios}
          </div>
          <div className="col-md-2">
            {new Date(inscripcion.fechaCreacion).toLocaleDateString()}
          </div>
          <div className="col-md-2">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-sm btn-dark"
                onClick={() => handleUpdateInscripcion(inscripcion.id, {
                  ...inscripcion,
                  comentarios: `Estado actualizado a aprobada - ${new Date().toLocaleString()}`,
                  estado: 'aprobada',
                  equipo_id: inscripcion.equipo_id // Asegurarnos de enviar el equipo_id
                })}
                disabled={inscripcion.estado === 'aprobada'}
              >
                Aprobar
              </button>
              <button 
                className="btn btn-sm btn-dark"
                onClick={() => handleUpdateInscripcion(inscripcion.id, {
                  ...inscripcion,
                  comentarios: `Estado actualizado a rechazada - ${new Date().toLocaleString()}`,
                  estado: 'rechazada',
                  equipo_id: inscripcion.equipo_id // Asegurarnos de enviar el equipo_id
                })}
                disabled={inscripcion.estado === 'rechazada'}
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal para nueva inscripción */}
      {showForm && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nueva Inscripción</h5>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body">
                <AddInscripcion 
                  onSubmit={handleCreateInscripcion}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inscripciones;