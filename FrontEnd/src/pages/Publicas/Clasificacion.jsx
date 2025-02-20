import React from 'react';
import ValoresClasificacion from '../../components/ValoresClasificacion';
import { useNavigate } from 'react-router-dom';

function Clasificacion() {
    const navigate = useNavigate();
    const { equipos, cargando, mensaje, ordenarEquipos } = ValoresClasificacion();

    const getColumnHeader = (title) => (
        <div className="col text-center">
            <div className="d-flex align-items-center justify-content-center">
                <span>{title}</span>
            </div>
        </div>
    );

    return (
        <>
            <div className="container" style={{ marginTop: '60px' }}>
                <div className="row">
                    {mensaje ? (
                        <div className="col-12 text-center">
                            <p>{mensaje}</p>
                        </div>
                    ) : (
                        <>
                            <div className="col-md-12 mb-5">
                                <div className="border">
                                    <h2 className="text-center text-danger mb-0 bg-dark text-white p-3">Grupo A</h2>
                                    <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                                        <div className="row bg-danger text-white py-2" style={{ gap: '10px' }}>
                                            {getColumnHeader("Equipo")}
                                            {getColumnHeader("Puntos")}
                                            {getColumnHeader("Goles a favor")}
                                            {getColumnHeader("Goles en contra")}
                                            {getColumnHeader("Diferencia")}
                                            {getColumnHeader("T. Amarillas")}
                                            {getColumnHeader("T. Rojas")}
                                        </div>
                                        {cargando ? (
                                            <div className="row text-center">
                                                <div className="col-12">Cargando equipos...</div>
                                            </div>
                                        ) : (
                                            equipos.tabla1 && ordenarEquipos(equipos.tabla1).map((equipo, index) => (
                                                <div key={equipo.id} className="row mb-3" style={{ gap: '10px', marginTop: '20px' }}>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.nombre}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.puntos}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.golesFavor}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.golesContra}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.diferenciaGoles}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.tarjetasAmarillas}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.tarjetasRojas}</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 mb-5">
                                <div className="border">
                                    <h2 className="text-center text-danger mb-0 bg-dark text-white p-3">Grupo B</h2>
                                    <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                                        <div className="row bg-danger text-white py-2" style={{ gap: '10px' }}>
                                            {getColumnHeader("Equipo")}
                                            {getColumnHeader("Puntos")}
                                            {getColumnHeader("Goles a favor")}
                                            {getColumnHeader("Goles en contra")}
                                            {getColumnHeader("Diferencia")}
                                            {getColumnHeader("T. Amarillas")}
                                            {getColumnHeader("T. Rojas")}
                                        </div>
                                        {cargando ? (
                                            <div className="row text-center">
                                                <div className="col-12">Cargando equipos...</div>
                                            </div>
                                        ) : (
                                            equipos.tabla2 && ordenarEquipos(equipos.tabla2).map((equipo, index) => (
                                                <div key={equipo.id} className="row mb-3" style={{ gap: '10px', marginTop: '20px' }}>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.nombre}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.puntos}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.golesFavor}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.golesContra}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.diferenciaGoles}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.tarjetasAmarillas}</span>
                                                    </div>
                                                    <div className="col text-center d-flex flex-column align-items-center">
                                                        <span>{equipo.tarjetasRojas}</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Clasificacion;
