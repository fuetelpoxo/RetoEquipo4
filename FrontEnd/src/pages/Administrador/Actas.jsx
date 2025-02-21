import React, { useState } from 'react';
import { useActas } from '../../hook/UseActas';
import Loading from '../../components/Loading';
import EditActa from '../../components/EditActa';
import AddActa from '../../components/AddActa';


function Actas() {
  const { actas, loading, error, handleDeleteActa, handleAddActa, handleUpdateActa } = useActas();
  const [vista, setVista] = useState("listado");
  const [actaSeleccionada, setActaSeleccionada] = useState(null);

  const handleEditar = (acta) => {
    setActaSeleccionada({...acta});
    setVista("editar");
  };

  const handleAñadir = () => {
    setVista("añadir");
  };

  const handleVolver = () => {
    setVista("listado");
    setActaSeleccionada(null);
  };

  const handleUpdate = async (actaId, actaData) => {
    try {
      await handleUpdateActa(actaId, actaData);
      handleVolver();
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const renderListado = () => (
    <>
      <div className="d-flex justify-content-between mb-4">
        <button onClick={handleAñadir} className="btn btn-danger">
          <i className="fa fa-plus"></i> Añadir Acta
        </button>
      </div>

      {/* Cabecera */}
      <div className="row bg-dark text-white">
        <div className="col-md-3"><strong>Partido</strong></div>
        <div className="col-md-2"><strong>Jugador</strong></div>
        <div className="col-md-2"><strong>Incidencia</strong></div>
        <div className="col-md-2"><strong>Hora</strong></div>
        <div className="col-md-3"><strong>Acciones</strong></div>
      </div>

      {/* Lista de actas */}
      {actas.map((acta) => (
        <div className="row py-3 border-bottom align-items-center" key={acta.id}>
          <div className="col-md-3">
            {acta.partido ? 
              `${acta.partido.equipoLocalNombre} vs ${acta.partido.equipoVisitanteNombre}` : 
              'Partido no encontrado'}
          </div>
          <div className="col-md-2">
            {acta.jugadorNombre || 'Jugador no encontrado'}
          </div>
          <div className="col-md-2">
            <span className={`badge ${
              acta.incidencia === 'gol' ? 'bg-success' :
              acta.incidencia === 'roja' ? 'bg-danger' :
              acta.incidencia === 'amarilla' ? 'bg-warning text-dark' :
              'bg-primary'
            }`}>
              {acta.incidencia || 'Sin incidencia'}
            </span>
          </div>
          <div className="col-md-2">{acta.hora || '--:--'}</div>
          <div className="col-md-3">
            <button 
              onClick={() => handleEditar(acta)} 
              className="btn btn-dark btn-sm me-2"
              title="Editar"
            >
              <i className="fa fa-edit"></i>
            </button>
            <button 
              className="btn btn-dark btn-sm" 
              onClick={() => handleDeleteActa(acta.id)}
              title="Eliminar"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Actas</h1>

      {vista === "listado" && renderListado()}

      {vista === "añadir" && (
        <AddActa 
          onSubmit={handleAddActa}
          onCancel={handleVolver}
        />
      )}

      {vista === "editar" && actaSeleccionada && (
        <EditActa
          acta={actaSeleccionada}
          onSubmit={(actaData) => handleUpdate(actaSeleccionada.id, actaData)}
          onCancel={handleVolver}
        />
      )}
    </div>
  );
}

export default Actas;
