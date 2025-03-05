import React from 'react';
import LogicaClasificacion from '../../core/LogicaClasificacion';
import { useNavigate } from 'react-router-dom';

function Clasificacion() {
    const navigate = useNavigate();
    const { equipos, cargando, mensaje, ordenarEquipos } = LogicaClasificacion();

    const getColumnHeader = (title) => (
        <div className="col text-center">
            <div className="d-flex align-items-center justify-content-center">
                <span>{title}</span>
            </div>
        </div>
    );

    const renderTabla = (tabla, titulo) => (
        <div className="col-md-12 mb-5">
            <div className="border">
                <h2 className="text-center text-danger mb-0 bg-dark text-white p-3">{titulo}</h2>
                <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                    <div className="row bg-danger text-white py-2" style={{ gap: '10px' }}>
                        {getColumnHeader("Equipo")}
                        {getColumnHeader("PTS")}
                        {getColumnHeader("PJ")}
                        {getColumnHeader("PG")}
                        {getColumnHeader("PE")}
                        {getColumnHeader("PP")}
                        {getColumnHeader("GF")}
                        {getColumnHeader("GC")}
                        {getColumnHeader("DIF")}
                    </div>
                    {cargando ? (
                        <div className="row text-center">
                            <div className="col-12">Cargando equipos...</div>
                        </div>
                    ) : (
                        tabla && ordenarEquipos(tabla).map((equipo) => (
                            <div key={equipo.id} className="row mb-3" style={{ gap: '10px', marginTop: '20px' }}>
                                <div className="col text-center">{equipo.nombre}</div>
                                <div className="col text-center">{equipo.puntos}</div>
                                <div className="col text-center">{equipo.partidosJugados}</div>
                                <div className="col text-center">{equipo.partidosGanados}</div>
                                <div className="col text-center">{equipo.partidosEmpatados}</div>
                                <div className="col text-center">{equipo.partidosPerdidos}</div>
                                <div className="col text-center">{equipo.golesFavor}</div>
                                <div className="col text-center">{equipo.golesContra}</div>
                                <div className="col text-center">{equipo.diferenciaGoles}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container" style={{ marginTop: '60px' }}>
            <div className="row">
                {mensaje ? (
                    <div className="col-12 text-center">
                        <p>{mensaje}</p>
                    </div>
                ) : (
                    <>
                        {renderTabla(equipos.tabla1, "Grupo A")}
                        {renderTabla(equipos.tabla2, "Grupo B")}
                    </>
                )}
            </div>
        </div>
    );
}

export default Clasificacion;
