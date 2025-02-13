import React from 'react';

const FaseFinal = ({ equipos }) => {
    // Función para mostrar el nombre del equipo si existe
    const renderEquipo = (equipo) => {
        return equipo ? equipo.nombre : "TBC";  // No mostramos nada si el equipo no está disponible
    };

    return (
        <div className="container" style={{ marginTop: '90px' }}>
            <h1 className="text-center mb-4 text-danger">Fase Final</h1>

            {/* Cuadro de Eliminatorias */}
            <div className="d-flex justify-content-center">

                {/* Semifinal 1 */}
                <div className="col-md-4 text-center mb-4">
                    <div className="card mb-3 border-dark">
                        <h3 className="text-white bg-danger p-2 rounded">Semifinal 1</h3>
                        <div className="card-body bg-dark text-white">
                            {/* Equipos en horizontal */}
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">{renderEquipo(equipos?.equipo1)}</h5>
                                    <p className="card-text">
                                        <span className="badge bg-warning">1º Tabla 1</span>
                                    </p>
                                </div>
                                <div>
                                    <h5 className="card-title">{renderEquipo(equipos?.equipo3)}</h5>
                                    <p className="card-text">
                                        <span className="badge bg-warning">2º Tabla 2</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conexión "vs" */}
                <div className="col-md-1 d-flex justify-content-center align-items-center">
                    <h2 className="text-white">vs</h2>
                </div>

                {/* Semifinal 2 */}
                <div className="col-md-4 text-center mb-4">
                    <div className="card mb-3 border-dark">
                        <h3 className="text-white bg-danger p-2 rounded">Semifinal 2</h3>
                        <div className="card-body bg-dark text-white">
                            {/* Equipos en horizontal */}
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">{renderEquipo(equipos?.equipo2)}</h5>
                                    <p className="card-text">
                                        <span className="badge bg-warning">2º Tabla 1</span>
                                    </p>
                                </div>
                                <div>
                                    <h5 className="card-title">{renderEquipo(equipos?.equipo4)}</h5>
                                    <p className="card-text">
                                        <span className="badge bg-warning">1º Tabla 2</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Final */}
            <div className="d-flex justify-content-center mt-5">
                <div className="col-md-6 text-center">
                    <h3 className="text-white bg-danger p-2 rounded">Final</h3>
                    <div className="card mb-3 border-dark">
                        <div className="card-body bg-dark text-white">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">{renderEquipo(equipos?.equipo1)}</h5>
                                    <p className="card-text">
                                        <span className="badge bg-warning">Ganador Semifinal 1</span>
                                    </p>
                                </div>
                                <div>
                                    <h5 className="card-title">{renderEquipo(equipos?.equipo2)}</h5>
                                    <p className="card-text">
                                        <span className="badge bg-warning">Ganador Semifinal 2</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaseFinal;
