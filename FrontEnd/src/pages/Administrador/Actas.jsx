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
        <button onClick={handleAñadir} className="btn btn-success">
          <i className="fa fa-plus"></i> Añadir Acta
        </button>
      </div>

      <div className="row bg-dark text-white py-2">
        <div className="col">Partido</div>
        <div className="col">Jugador</div>
        <div className="col">Incidencia</div>
        <div className="col">Hora</div>
        <div className="col">Acciones</div>
      </div>

      {actas.map((acta) => (
        <div className="row border-bottom py-2" key={`acta-${acta.id}`}>
          <div className="col">
            {acta.partidoInfo}
          </div>
          <div className="col">
            {acta.jugadorNombre}
          </div>
          <div className="col">
            <span className={`badge ${
              acta.incidencia === 'gol' ? 'bg-success' :
              acta.incidencia === 'roja' ? 'bg-danger' :
              acta.incidencia === 'amarilla' ? 'bg-warning text-dark' :
              'bg-primary'
            }`}>
              {acta.incidencia}
            </span>
          </div>
          <div className="col">{acta.hora}</div>
          <div className="col">
            <button 
              onClick={() => handleEditar(acta)} 
              className="btn btn-black btn-sm me-2"
              title="Editar"
            >
              <i className="fa fa-edit"></i>
            </button>
            <button 
              className="btn btn-black btn-sm" 
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
