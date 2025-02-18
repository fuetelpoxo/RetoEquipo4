import React, { useState } from "react";
import { useEquipos } from "../../hook/UseEquipos";
import Loading from "../../components/Loading";
import EditEquipo from "../../components/EditEquipo";
import DetallesEquipo from "../../components/DetallesEquipo";

function Equipos() {
  const { equipos, loading, error, handleDeleteEquipo, handleAddEquipo, handleUpdateEquipo } = useEquipos();
  const [vista, setVista] = useState("listado");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const handleEditar = (equipo) => {
    setEquipoSeleccionado(equipo);
    setVista("editar");
  };

  const handleDetalles = (equipo) => {
    setEquipoSeleccionado(equipo);
    setVista("detalles");
  };

  const handleAñadir = () => {
    setVista("añadir");
  };

  const handleVolver = () => {
    setVista("listado");
    setEquipoSeleccionado(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Equipos</h1>

      {vista === "listado" && (
        <>
          <button onClick={handleAñadir} className="btn btn-success mb-4">
            <i className="fa fa-plus"></i> Añadir Equipo
          </button>

          <div className="row bg-dark text-white">
            <div className="col">Nombre</div>
            <div className="col">Grupo</div>
            <div className="col">Fecha de Creación</div>
            <div className="col">Acciones</div>
          </div>

          {equipos.map((equipo) => (
            <div className="row border-bottom py-2" key={equipo.id}>
              <div className="col">{equipo.nombre}</div>
              <div className="col">{equipo.grupo}</div>
              <div className="col">
                {new Date(equipo.fechaCreacion).toLocaleDateString()}
              </div>
              <div className="col">
                <button onClick={() => handleDetalles(equipo)} className="btn btn-black btn-sm me-2">
                  <i className="fa fa-eye"></i>
                </button>
                <button onClick={() => handleEditar(equipo)} className="btn btn-black btn-sm me-2">
                  <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-black btn-sm" onClick={() => handleDeleteEquipo(equipo.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {vista === "añadir" && (
        <EditEquipo 
          onSubmit={handleAddEquipo}
          onCancel={handleVolver}
        />
      )}

      {vista === "editar" && equipoSeleccionado && (
        <EditEquipo
          equipo={equipoSeleccionado}
          onSubmit={(equipoData) => handleUpdateEquipo(equipoSeleccionado.id, equipoData)}
          onCancel={handleVolver}
        />
      )}

      {vista === "detalles" && equipoSeleccionado && (
        <DetallesEquipo
          equipo={equipoSeleccionado}
          onCancel={handleVolver}
        />
      )}
    </div>
  );
}

export default Equipos;