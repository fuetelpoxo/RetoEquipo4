import React, { useState } from 'react';
import { useInscripciones } from '../../hook/useInscripciones';
import Loading from '../../components/Loading';
import AddInscripcion from '../../components/AddInscripcion';
import EditEquipo from '../../components/EditEquipo';
import MenuEntrenador from '../../components/MenuEntrenador';

function Entrenador() {
  const { equipos = [], loading, error, handleCreateInscripcion } = useInscripciones();
  const [showForm, setShowForm] = useState(false);
  const [editingEquipo, setEditingEquipo] = useState(null);
  
  const usuarioId = 1;

  const equiposUsuario = equipos.filter(equipo => equipo.usuarioIdCreacion === usuarioId);

  const handleEditEquipo = (equipo) => {
    setEditingEquipo(equipo);
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <MenuEntrenador />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Inscribir Equipo</h1>
          <button 
            className="btn btn-danger"
            onClick={() => setShowForm(true)}
          >
            Nueva Inscripción
          </button>
        </div>
        <div className="row">
          {equiposUsuario.map(equipo => (
            <div key={equipo.id} className="col-md-4 mb-3">
              <div className="card" style={{ cursor: 'pointer' }} onClick={() => handleEditEquipo(equipo)}>
                <div className="card-body">
                  <h5 className="card-title">{equipo.nombre}</h5>
                  <p className="card-text">
                    Centro: {equipo.centro.nombre}<br/>
                    Grupo: {equipo.grupo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Nueva Inscripción */}
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
                    onSubmit={async (data) => {
                      try {
                        await handleCreateInscripcion(data);
                        setShowForm(false);
                      } catch (error) {
                        console.error('Error al crear inscripción:', error);
                      }
                    }}
                    onCancel={() => setShowForm(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Editar Equipo */}
        {editingEquipo && (
          <EditEquipo
            equipo={editingEquipo}
            onSubmit={async (data) => {
              try {
                // Aquí deberías implementar la lógica para actualizar el equipo
                console.log('Datos actualizados:', data);
                setEditingEquipo(null);
              } catch (error) {
                console.error('Error al actualizar equipo:', error);
              }
            }}
            onCancel={() => setEditingEquipo(null)}
          />
        )}
      </div>
    </>
  );
}

export default Entrenador;