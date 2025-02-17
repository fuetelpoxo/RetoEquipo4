import React from "react";
import Loading from "../../components/Loading";

const Equipos = () => {
  const equipos = [
    { id: 1, nombre: "Equipo 1", entrenador: "Entrenador 1", dni: "12345678A" },
    { id: 2, nombre: "Equipo 2", entrenador: "Entrenador 2", dni: "87654321B" },
    { id: 3, nombre: "Equipo 3", entrenador: "Entrenador 3", dni: "45612378C" },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Equipos</h1>
      
      <div className="row">
        {/* Tabla de todos los equipos */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-danger text-black">
              <h4 className="mb-0 ">Todos los equipos</h4>
            </div>
            <div className="card-body p-0">
              

              <div className="table-responsive">
                <div className="row bg-dark text-white py-2 mx-0">
                  <div className="col">Jugadores</div>
                  <div className="col">Entrenador</div>
                  <div className="col">DNI</div>
                  <div className="col">Acciones</div>
                </div>

                {equipos.map((equipo) => (
                  <div className="row border-bottom py-2 mx-0" key={equipo.id}>
                    <div className="col">{equipo.nombre}</div>
                    <div className="col">{equipo.entrenador}</div>
                    <div className="col">{equipo.dni}</div>
                    <div className="col">
                      <button className="btn ">
                        <i className="fa fa-eye"></i>
                      </button>
                      <button className="btn ">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="btn ">
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-success m-3">
                <i className="fa fa-plus"></i> Añadir Equipo
              </button>
        </div>
                
        {/* Tabla de equipos pendientes */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">Equipos pendientes</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <div className="row bg-dark text-white py-2 mx-0">
                  <div className="col">Jugadores</div>
                  <div className="col">Entrenador</div>
                  <div className="col">DNI</div>
                  <div className="col">Acciones</div>
                </div>

                {equipos.map((equipo) => (
                  <div className="row border-bottom py-2 mx-0" key={equipo.id}>
                    <div className="col">{equipo.nombre}</div>
                    <div className="col">{equipo.entrenador}</div>
                    <div className="col">{equipo.dni}</div>
                    <div className="col">
                      <button className="btn btn-info btn-sm me-2">
                        <i className="fa fa-eye"></i>
                      </button>
                      <button className="btn btn-warning btn-sm me-2">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="btn btn-danger btn-sm">
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipos;
