import React, { useState } from 'react';
import { useInscripciones } from '../../hook/useInscripciones';
import Loading from '../../components/Loading';
import AddInscripcion from '../../components/AddInscripcion';
import MenuEntrenador from '../../components/MenuEntrenador';

function Entrenador() {
  const { equipos = [], loading, error, handleCreateInscripcion } = useInscripciones();
  const [showForm, setShowForm] = useState(false);

  console.log('Equipos disponibles:', equipos); // Debug log

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
      </div>
    </>
  );
}

export default Entrenador;