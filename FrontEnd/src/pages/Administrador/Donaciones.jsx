import React, { useState } from 'react';
import { useDonaciones } from '../../hook/UseDonaciones';
import Loading from '../../components/Loading';
import EditDonacion from '../../components/EditDonacion';

function Donaciones() {
  const { donaciones, loading, error, handleUpdateDonacion } = useDonaciones();
  const [vista, setVista] = useState("listado");
  const [donacionSeleccionada, setDonacionSeleccionada] = useState(null);

  const handleEditar = (donacion) => {
    setDonacionSeleccionada({...donacion});
    setVista("editar");
  };

  const handleVolver = () => {
    setVista("listado");
    setDonacionSeleccionada(null);
  };

  const handleUpdate = async (donacionId, donacionData) => {
    try {
      await handleUpdateDonacion(donacionId, donacionData);
      handleVolver();
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const renderListado = () => (
    <>
      <div className="row bg-dark text-white py-2">
        <div className="col">ONG</div>
        <div className="col">Kilos</div>
        <div className="col">Importe</div>
        <div className="col">Última Actualización</div>
        <div className="col">Acciones</div>
      </div>

      {donaciones.map((donacion) => (
        <div className="row border-bottom py-2" key={`donacion-${donacion.id}`}>
          <div className="col">{donacion.nombreOng}</div>
          <div className="col">{donacion.kilos} kg</div>
          <div className="col">{donacion.importe} €</div>
          <div className="col">
            {new Date(donacion.fechaActualizacion).toLocaleDateString()}
          </div>
          <div className="col">
            <button 
              onClick={() => handleEditar(donacion)} 
              className="btn btn-black btn-sm me-2"
              title="Editar"
            >
              <i className="fa fa-edit"></i>
            </button>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Donaciones</h1>

      {vista === "listado" && renderListado()}

      {vista === "editar" && donacionSeleccionada && (
        <EditDonacion
          donacion={donacionSeleccionada}
          onSubmit={(donacionData) => handleUpdate(donacionSeleccionada.id, donacionData)}
          onCancel={handleVolver}
        />
      )}
    </div>
  );
}

export default Donaciones;
