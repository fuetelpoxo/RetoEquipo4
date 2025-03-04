import React from 'react';
import { useLogicaHorarios } from '../../core/LogicaHorarios';

function Horarios() {
    const { partidos, loading, error } = useLogicaHorarios();

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                {error}
            </div>
        );
    }

    if (!partidos?.length) {
        return (
            <div className="alert alert-info m-4" role="alert">
                No hay partidos programados
            </div>
        );
    }

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatearHora = (hora) => {
        return hora?.substring(0, 5) || '';
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 text-dark border-bottom border-success pb-3">
                Calendario de Partidos
            </h2>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    {/* Header Row */}
                    <div className="card mb-4 bg-dark text-white">
                        <div className="card-body py-2">
                            <div className="row align-items-center text-center">
                                <div className="col-md-2">
                                    <h6 className="mb-0">FECHA</h6>
                                </div>
                                <div className="col-md-8">
                                    <h6 className="mb-0">EQUIPOS</h6>
                                </div>
                                <div className="col-md-2">
                                    <h6 className="mb-0">HORA</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Partidos */}
                    {partidos.map((partido) => (
                        <div
                            key={partido.id}
                            className="card mb-3 shadow border-0 bg-light hover-card"
                        >
                            <div className="card-body py-3">
                                <div className="row align-items-center text-center">
                                    <div className="col-md-2">
                                        <div className="fw-bold text-success">
                                            {formatearFecha(partido.fecha)}
                                        </div>
                                    </div>
                                    <div className="col-md-8 position-relative">
                                        <div className="position-absolute start-50 translate-middle-x" style={{ zIndex: 1 }}>
                                            <span className="badge bg-danger px-3 py-2">VS</span>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="text-end pe-3">
                                                <span className="fw-bold fs-5 text-dark">
                                                    {partido.equipoL?.nombre || partido.equipoL}
                                                </span>
                                            </div>
                                            <div className="invisible px-3">VS</div> {/* Spacer for VS */}
                                            <div className="text-start ps-3">
                                                <span className="fw-bold fs-5 text-dark">
                                                    {partido.equipoV?.nombre || partido.equipoV}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="badge bg-dark px-3 py-2">
                                            {formatearHora(partido.hora)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Horarios;

