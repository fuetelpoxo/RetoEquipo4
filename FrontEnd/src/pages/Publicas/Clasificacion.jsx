import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Clasificacion() {
    const [equipos, setEquipos] = useState({ tabla1: [], tabla2: [] });
    const [cargando, setCargando] = useState(true); // Estado para controlar si estamos cargando
    const [mensaje, setMensaje] = useState(""); // Estado para manejar el mensaje de error o vacio
    const navigate = useNavigate();

    useEffect(() => {
        // Función para obtener los equipos de la API
        const obtenerEquipos = async () => {
            try {
                const response = await fetch('https://api.example.com/equipos'); // Reemplaza esta URL por la de tu API
                const data = await response.json();

                if (data.length === 0) {
                    setMensaje("No hay equipos creados todavía, vuelve más tarde.");
                    setCargando(false);
                    return;
                }

                // Barajar los equipos de manera aleatoria
                const equiposAleatorios = data.sort(() => Math.random() - 0.5);

                // Dividir los equipos en dos tablas, asegurándonos de que haya la misma cantidad en cada una
                const mitad = Math.floor(equiposAleatorios.length / 2);
                const tabla1 = equiposAleatorios.slice(0, mitad);
                const tabla2 = equiposAleatorios.slice(mitad);

                setEquipos({ tabla1, tabla2 });
                setCargando(false); // Ya hemos terminado de cargar
            } catch (error) {
                console.error('Error al obtener los equipos:', error);
                setCargando(false);
            }
        };

        obtenerEquipos();
    }, []);

    const ordenarEquipos = (equipos) => {
        return equipos.sort((a, b) => {
            // Ordenar por puntos (de mayor a menor)
            if (b.puntos !== a.puntos) {
                return b.puntos - a.puntos;
            }
            // Si hay empate, ordenar por diferencia de goles (de mayor a menor)
            const diferenciaGolesA = a.golesFavor - a.golesContra;
            const diferenciaGolesB = b.golesFavor - b.golesContra;
            if (diferenciaGolesB !== diferenciaGolesA) {
                return diferenciaGolesB - diferenciaGolesA;
            }
            // Si sigue el empate, ordenar por menor número de tarjetas amarillas (de menor a mayor)
            if (a.tarjetasAmarillas !== b.tarjetasAmarillas) {
                return a.tarjetasAmarillas - b.tarjetasAmarillas;
            }
            // Si aún sigue el empate, ordenar por mayor número de goles a favor (de mayor a menor)
            return b.golesFavor - a.golesFavor;
        });
    };

    return (
        <>
            <div className="container" style={{ marginTop: '90px' }}>
                <h1 className="text-center mb-4 text-danger">Clasificación</h1>

                <div className="row">
                    {/* Si no hay equipos */}
                    {mensaje ? (
                        <div className="col-12 text-center">
                            <p>{mensaje}</p>
                        </div>
                    ) : (
                        <>
                            {/* Contenedor Tabla 1 */}
                            <div className="col-md-12 mb-5">
                                <div className="border">
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
                                        {cargando ? (
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
                                <div className="border">
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
                                        {cargando ? (
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Clasificacion;
