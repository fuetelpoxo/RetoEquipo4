import React, { useState } from 'react';
import { useActas } from '../../hook/UseActas';
import AddActa from '../../components/AddActa';
import EditActa from '../../components/EditActa';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';

function ActasDirector() {
  const { user } = useAuth();
  const { actas, loading, error, handleAddActa, handleUpdateActa, handleDeleteActa } = useActas(user?.id);
  const [vista, setVista] = useState('listado');
  const [actaSeleccionada, setActaSeleccionada] = useState(null);

  const handleVolver = () => {
    setVista('listado');
    setActaSeleccionada(null);
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const renderListado = () => (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Mis Actas</h1>
        <button className="btn btn-success" onClick={() => setVista('crear')}>
          <i className="fa fa-plus"></i> Nueva Acta
        </button>
      </div>

      <div className="row bg-dark text-white py-2">
        <div className="col">Partido</div>
        <div className="col">Jugador</div>
        <div className="col">Incidencia</div>
        <div className="col">Hora</div>
        <div className="col">Acciones</div>
      </div>

      {actas.length === 0 ? (
        <div className="alert alert-info mt-3">No has creado ninguna acta todavía.</div>
      ) : (
        actas.map((acta) => (
          <div className="row border-bottom py-2" key={acta.id}>
            <div className="col">
              {`${acta.partido?.equipoLocal?.nombre || 'N/A'} vs ${acta.partido?.equipoVisitante?.nombre || 'N/A'}`}
            </div>
            <div className="col">
              {`${acta.jugador?.nombre || 'N/A'} ${acta.jugador?.apellido1 || ''}`}
            </div>
            <div className="col">{acta.incidencia}</div>
            <div className="col">{acta.hora}</div>
            <div className="col">
              <button 
                onClick={() => {
                  setActaSeleccionada(acta);
                  setVista('editar');
                }} 
                className="btn btn-black btn-sm me-2"
                title="Editar"
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                onClick={() => handleDeleteActa(acta.id)}
                className="btn btn-black btn-sm"
                title="Eliminar"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );

  return (
    <div className="container mt-5">
      {vista === 'listado' && renderListado()}
      
      {vista === 'crear' && (
        <AddActa 
          onSubmit={handleAddActa}
          onCancel={handleVolver}
          usuarioId={user?.id}
        />
      )}
      
      {vista === 'editar' && actaSeleccionada && (
        <EditActa 
          acta={actaSeleccionada}
          onSubmit={(data) => handleUpdateActa(actaSeleccionada.id, data)}
          onCancel={handleVolver}
          usuarioId={user?.id}
        />
      )}
    </div>
  );
}

export default ActasDirector;