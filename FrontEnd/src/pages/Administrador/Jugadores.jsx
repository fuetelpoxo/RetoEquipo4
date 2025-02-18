import React, { useState } from "react";
import { useJugadores } from "../../hook/UseJugadores";
import Loading from "../../components/Loading";
import DetallesJugador from "../../components/DetallesJugador";
import EditJugador from "../../components/EditJugador";
import AddJugador from "../../components/AddJugador";
import Paginador from "../../components/Paginador";

function Jugadores() {
  const { jugadores, loading, error, handleDeleteJugador, handleAddJugador, handleUpdateJugador } = useJugadores();
  const [vista, setVista] = useState("listado");
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEquipo, setFiltroEquipo] = useState(""); // Nuevo estado para filtro de equipo
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Obtener equipos únicos para el filtro
  const equiposUnicos = [...new Set(jugadores.map(j => j.nombreEquipo))].sort();

  // Aplicar filtros
  const jugadoresFiltrados = jugadores.filter(jugador => {
    const coincideNombreODni = `${jugador.nombre} ${jugador.apellido1} ${jugador.apellido2}`
      .toLowerCase()
      .includes(busqueda.toLowerCase()) ||
      jugador.dni.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEquipo = !filtroEquipo || jugador.nombreEquipo === filtroEquipo;

    return coincideNombreODni && coincideEquipo;
  });

  // Calcular índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const jugadoresActuales = jugadoresFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditar = (jugador) => {
    setJugadorSeleccionado(jugador);
    setVista("editar");
  };

  const handleDetalles = (jugador) => {
    setJugadorSeleccionado(jugador);
    setVista("detalles");
  };

  const handleAñadir = () => {
    setVista("añadir");
  };

  const handleVolver = () => {
    setVista("listado");
    setJugadorSeleccionado(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Jugadores</h1>

      {vista === "listado" && (
        <>
          <div className="d-flex justify-content-between mb-4">
            <button onClick={handleAñadir} className="btn btn-success">
              <i className="fa fa-plus"></i> Añadir Jugador
            </button>
            <div className="d-flex gap-2 w-50">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar jugador..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setCurrentPage(1); // Reset página al buscar
                }}
              />
              <select
                className="form-select w-50"
                value={filtroEquipo}
                onChange={(e) => {
                  setFiltroEquipo(e.target.value);
                  setCurrentPage(1); // Reset página al filtrar
                }}
              >
                <option value="">Todos los equipos</option>
                {equiposUnicos.map((equipo, index) => (
                  <option key={index} value={equipo}>
                    {equipo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row bg-dark text-white">
            <div className="col">Nombre</div>
            <div className="col">DNI</div>
            <div className="col">Tipo</div>
            <div className="col">Equipo</div>
            <div className="col">Acciones</div>
          </div>

          {jugadoresActuales.map((jugador) => (
            <div className="row border-bottom py-2" key={jugador.id}>
              <div className="col">
                {`${jugador.nombre} ${jugador.apellido1} ${jugador.apellido2 || ''}`}
              </div>
              <div className="col">{jugador.dni}</div>
              <div className="col">
                <span className={`badge ${
                  jugador.tipo === 'capitan' ? 'bg-danger' :
                  jugador.tipo === 'entrenador' ? 'bg-success' :
                  'bg-primary'
                }`}>
                  {jugador.tipo}
                </span>
              </div>
              <div className="col">
                  {jugador.nombreEquipo}
              </div>
              <div className="col">
                <button onClick={() => handleDetalles(jugador)} className="btn btn-black btn-sm me-2">
                  <i className="fa fa-eye"></i>
                </button>
                <button onClick={() => handleEditar(jugador)} className="btn btn-black btn-sm me-2">
                  <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-black btn-sm" onClick={() => handleDeleteJugador(jugador.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}

          <Paginador
            currentPage={currentPage}
            totalItems={jugadoresFiltrados.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            showingFrom={indexOfFirstItem + 1}
            showingTo={Math.min(indexOfLastItem, jugadoresFiltrados.length)}
          />
        </>
      )}

      {vista === "añadir" && (
        <AddJugador 
          onSubmit={handleAddJugador}
          onCancel={handleVolver}
        />
      )}

      {vista === "editar" && jugadorSeleccionado && (
        <EditJugador
          jugador={jugadorSeleccionado}
          onSubmit={(jugadorData) => handleUpdateJugador(jugadorSeleccionado.id, jugadorData)}
          onCancel={handleVolver}
        />
      )}

      {vista === "detalles" && jugadorSeleccionado && (
        <DetallesJugador
          jugador={jugadorSeleccionado}
          onCancel={handleVolver}
        />
      )}
    </div>
  );
}

export default Jugadores;