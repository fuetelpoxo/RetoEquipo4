import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EquiposService from '../../core/EquiposService';

const Clasificacion = () => {
    const [equipos, setEquipos] = useState({ tabla1: [], tabla2: [] });
    const [equiposSeleccionados, setEquiposSeleccionados] = useState(null);
    const [cargando, setCargando] = useState(true); // Estado para controlar si estamos cargando
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerEquipos = async () => {
            const data = await EquiposService.obtenerEquipos();

            setEquipos({
                tabla1: data.tabla1,
                tabla2: data.tabla2
            });

            const equipo1 = data.tabla1[0] || null;
            const equipo2 = data.tabla1[1] || null;
            const equipo3 = data.tabla2[0] || null;
            const equipo4 = data.tabla2[1] || null;

            setEquiposSeleccionados({
                equipo1,
                equipo2,
                equipo3,
                equipo4
            });

            setCargando(false); // Cambiar el estado a 'false' cuando termine de cargar los equipos
        };

        obtenerEquipos();
    }, []);

    const ordenarEquipos = (equipos) => {
        return equipos.sort((a, b) => b.puntos - a.puntos); // Ordenar por puntos de mayor a menor
    };

    return (
        <div className="container" style={{ marginTop: '90px' }}>
            <h1 className="text-center mb-4 text-danger">Clasificación</h1>

            <div className="row">
                {/* Contenedor Tabla 1 */}
                <div className="col-md-12 mb-5">
                    <div className="border rounded-3 p-3">
                        <h2 className="text-center text-danger mb-0 bg-dark text-white p-3">Tabla 1</h2>
                        <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                            {/* Cabecera de los campos */}
                            <div className="row bg-danger text-white py-2" style={{ gap: '10px' }}>
                                <div className="col text-center">Equipo</div>
                                <div className="col text-center">Puntos</div>
                                <div className="col text-center">Goles a favor</div>
                                <div className="col text-center">Goles en contra</div>
                                <div className="col text-center">Diferencia de goles</div>
                                <div className="col text-center">Tarjetas amarillas</div>
                                <div className="col text-center">Tarjetas rojas</div>
                            </div>
                            {/* Equipos ordenados */}
                            {equipos.tabla1.length === 0 ? (
                                <div className="row text-center">
                                    <div className="col-12">Cargando equipos...</div>
                                </div>
                            ) : (
                                ordenarEquipos(equipos.tabla1).slice(0, 5).map((equipo) => (
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

                {/* Contenedor Tabla 2 */}
                <div className="col-md-12 mb-5">
                    <div className="border rounded-3 p-3">
                        <h2 className="text-center text-danger mb-0 bg-dark text-white p-3">Tabla 2</h2>
                        <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                            {/* Cabecera de los campos */}
                            <div className="row bg-danger text-white py-2" style={{ gap: '10px' }}>
                                <div className="col text-center">Equipo</div>
                                <div className="col text-center">Puntos</div>
                                <div className="col text-center">Goles a favor</div>
                                <div className="col text-center">Goles en contra</div>
                                <div className="col text-center">Diferencia de goles</div>
                                <div className="col text-center">Tarjetas amarillas</div>
                                <div className="col text-center">Tarjetas rojas</div>
                            </div>
                            {/* Equipos ordenados */}
                            {equipos.tabla2.length === 0 ? (
                                <div className="row text-center">
                                    <div className="col-12">Cargando equipos...</div>
                                </div>
                            ) : (
                                ordenarEquipos(equipos.tabla2).slice(0, 5).map((equipo) => (
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
            </div>
        </div>
    );
};

export default Clasificacion;
