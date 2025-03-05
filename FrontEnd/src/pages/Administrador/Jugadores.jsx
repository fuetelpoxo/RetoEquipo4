import React, { useState, useMemo } from "react";
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
  const [filtroEquipo, setFiltroEquipo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Memoizar equipos únicos para evitar recálculos innecesarios
  const equiposUnicos = useMemo(() => {
    return [...new Set(
      jugadores
        .filter(j => j.nombreEquipo && j.nombreEquipo.trim())
        .map(j => j.nombreEquipo)
    )].sort();
  }, [jugadores]);

  // Memoizar jugadores filtrados con validaciones
  const jugadoresFiltrados = useMemo(() => {
    return jugadores.filter(jugador => {
      // Validar que jugador y sus propiedades existan
      if (!jugador) return false;

      const nombreCompleto = `${jugador.nombre || ''} ${jugador.apellido1 || ''} ${jugador.apellido2 || ''}`.toLowerCase();
      const busquedaLower = (busqueda || '').toLowerCase();
      const dniLower = (jugador.dni || '').toLowerCase();
      
      const coincideNombreODni = nombreCompleto.includes(busquedaLower) || 
                                dniLower.includes(busquedaLower);

      const coincideEquipo = !filtroEquipo || 
                            (jugador.nombreEquipo === filtroEquipo);

      return coincideNombreODni && coincideEquipo;
    });
  }, [jugadores, busqueda, filtroEquipo]);

  // Memoizar jugadores actuales para la página actual
  const jugadoresActuales = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return jugadoresFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  }, [jugadoresFiltrados, currentPage, itemsPerPage]);

  // Handlers
  const handleSearch = (e) => {
    setBusqueda(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterEquipo = (e) => {
    setFiltroEquipo(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditar = (jugador) => {
    setJugadorSeleccionado({...jugador}); // Clonar el jugador para evitar mutaciones
    setVista("editar");
  };

  const handleDetalles = (jugador) => {
    setJugadorSeleccionado({...jugador});
    setVista("detalles");
  };

  const handleAñadir = () => {
    setVista("añadir");
  };

  const handleVolver = () => {
    setVista("listado");
    setJugadorSeleccionado(null);
  };

  const handleUpdate = async (jugadorId, jugadorData) => {
    try {
      await handleUpdateJugador(jugadorId, jugadorData);
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
          <i className="fa fa-plus"></i> Añadir Jugador
        </button>
        <div className="d-flex gap-2 w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar jugador..."
            value={busqueda}
            onChange={handleSearch}
          />
          <select
            className="form-select w-50"
            value={filtroEquipo}
            onChange={handleFilterEquipo}
          >
            <option value="">Todos los equipos</option>
            {equiposUnicos.map((equipo) => (
              <option key={`equipo-${equipo}`} value={equipo}>
                {equipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row bg-dark text-white py-2">
        <div className="col">Nombre</div>
        <div className="col">DNI</div>
        <div className="col">Tipo</div>
        <div className="col">Equipo</div>
        <div className="col">Acciones</div>
      </div>

      {jugadoresActuales.map((jugador) => (
        <div className="row border-bottom py-2" key={`jugador-${jugador.id}`}>
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
          <div className="col">{jugador.nombreEquipo || 'Sin equipo'}</div>
          <div className="col">
            <button 
              onClick={() => handleDetalles(jugador)} 
              className="btn btn-black btn-sm me-2"
              title="Ver detalles"
            >
              <i className="fa fa-eye"></i>
            </button>
            <button 
              onClick={() => handleEditar(jugador)} 
              className="btn btn-black btn-sm me-2"
              title="Editar"
            >
              <i className="fa fa-edit"></i>
            </button>
            <button 
              className="btn btn-black btn-sm" 
              onClick={() => handleDeleteJugador(jugador.id)}
              title="Eliminar"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      ))}

      <Paginador
        currentPage={currentPage}
        totalItems={jugadoresFiltrados.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        showingFrom={(currentPage - 1) * itemsPerPage + 1}
        showingTo={Math.min(currentPage * itemsPerPage, jugadoresFiltrados.length)}
      />
    </>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Jugadores</h1>

      {vista === "listado" && renderListado()}

      {vista === "añadir" && (
        <AddJugador 
          onSubmit={handleAddJugador}
          onCancel={handleVolver}
        />
      )}

      {vista === "editar" && jugadorSeleccionado && (
        <EditJugador
          jugador={jugadorSeleccionado}
          onSubmit={(jugadorData) => handleUpdate(jugadorSeleccionado.id, jugadorData)}
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