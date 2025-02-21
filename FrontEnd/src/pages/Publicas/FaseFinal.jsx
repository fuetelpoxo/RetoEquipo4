import React from 'react';
import LogicaFaseFinal from '../../components/LogicaFaseFinal';

function FaseFinal() {
    // Obtener datos y funciones de la lógica de la fase final
    const { equipos, error, avanzarEquipo } = LogicaFaseFinal();

    // Mostrar mensaje de error si hay algún problema
    if (error) return <div className="alert alert-danger text-center">{error}</div>;
    // Mostrar mensaje si no hay datos disponibles
    if (!equipos) return <div className="text-center">No hay datos disponibles</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Fase Final del Torneo</h2>

            {/* Semifinales */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-success text-white text-center">
                            <h3 className="card-title mb-0">Semifinal 1</h3>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="mb-3">{equipos.equipo1?.nombre || 'Por Determinar'} vs {equipos.equipo4?.nombre || 'Por Determinar'}</h5>
                            {equipos.ganadorSemi1 && (
                                <div className="alert alert-success mt-3">
                                    Avanza: {equipos.ganadorSemi1.nombre}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-success text-white text-center">
                            <h3 className="card-title mb-0">Semifinal 2</h3>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="mb-3">{equipos.equipo2?.nombre || 'Por Determinar'} vs {equipos.equipo3?.nombre || 'Por Determinar'}</h5>
                            {equipos.ganadorSemi2 && (
                                <div className="alert alert-success mt-3">
                                    Avanza: {equipos.ganadorSemi2.nombre}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Final */}
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card shadow">
                        <div className="card-header bg-danger text-white text-center">
                            <h3 className="card-title mb-0">Final</h3>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="mb-3">
                                {equipos.ganadorSemi1?.nombre || 'Por Determinar'} vs {equipos.ganadorSemi2?.nombre || 'Por Determinar'}
                            </h5>
                            {equipos.campeon && (
                                <div className="alert alert-success mt-3">
                                    ¡Campeón del Torneo: {equipos.campeon.nombre}!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tercer Puesto */}
            <div className="row mb-4">
                <div className="col-md-4 offset-md-4 mt-4">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white text-center">
                            <h3 className="card-title mb-0">Tercer Puesto</h3>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="mb-3">
                                {equipos.resultadoSemi1?.perdedor?.nombre || 'Por Determinar'} vs {equipos.resultadoSemi2?.perdedor?.nombre || 'Por Determinar'}
                            </h5>
                            {equipos.tercerPuesto && (
                                <div className="alert alert-warning mt-3">
                                    Tercer Lugar: {equipos.tercerPuesto.nombre}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FaseFinal;