import React, { useState, useEffect } from 'react';

function LogicaClasificacion() {
    const [equipos, setEquipos] = useState({ tabla1: [], tabla2: [] });
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [actasData, setActasData] = useState([]);
    const [jugadoresData, setJugadoresData] = useState([]);
    const [partidosData, setPartidosData] = useState([]);
    const [equiposData, setEquiposData] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                // Get all required data
                const [equiposRes, partidosRes, actasRes, jugadoresRes] = await Promise.all([
                    fetch('/api/equipos'),
                    fetch('/api/partidos'),
                    fetch('/api/actas'),
                    fetch('/api/jugadores')
                ]);

                const [equiposJson, partidosJson, actasJson, jugadoresJson] = await Promise.all([
                    equiposRes.json(),
                    partidosRes.json(),
                    actasRes.json(),
                    jugadoresRes.json()
                ]);

                setEquiposData(equiposJson.data || []);
                setPartidosData(partidosJson.data || []);
                setActasData(actasJson.data || []);
                setJugadoresData(jugadoresJson.data || []);

                if (!equiposJson.data?.length) {
                    setMensaje("No hay equipos disponibles");
                    return;
                }

                // Initialize teams with statistics
                const equiposConEstadisticas = equiposJson.data.map(equipo => ({
                    id: Number(equipo.id),
                    nombre: equipo.nombre,
                    grupo: equipo.grupo,
                    puntos: 0,
                    golesFavor: 0,
                    golesContra: 0,
                    diferenciaGoles: 0,
                    tarjetasAmarillas: 0,
                    tarjetasRojas: 0
                }));

                // Process goals and points first
                equiposConEstadisticas.forEach(estadisticas => {
                    partidosJson.data.forEach(partido => {
                        const golesLocal = Number(partido.golesL) || 0;
                        const golesVisitante = Number(partido.golesV) || 0;

                        if (partido.equipoL_id === estadisticas.id) {
                            estadisticas.golesFavor += golesLocal;
                            estadisticas.golesContra += golesVisitante;
                            if (golesLocal > golesVisitante) estadisticas.puntos += 3;
                            else if (golesLocal === golesVisitante) estadisticas.puntos += 1;
                        } else if (partido.equipoV_id === estadisticas.id) {
                            estadisticas.golesFavor += golesVisitante;
                            estadisticas.golesContra += golesLocal;
                            if (golesVisitante > golesLocal) estadisticas.puntos += 3;
                            else if (golesVisitante === golesLocal) estadisticas.puntos += 1;
                        }
                    });

                    estadisticas.diferenciaGoles = estadisticas.golesFavor - estadisticas.golesContra;
                });

                const procesarTarjetasEquipo = () => {
                    equiposConEstadisticas.forEach(equipo => {
                        equipo.tarjetasAmarillas = 0;
                        equipo.tarjetasRojas = 0;
                    });

                    console.log("actasJson.data:", actasJson.data); // Log actasJson.data
                    console.log("jugadoresJson.data:", jugadoresJson.data); // Log jugadoresJson.data
                    console.log("equiposConEstadisticas:", equiposConEstadisticas); // Log equiposConEstadisticas

                    actasJson.data.forEach(acta => {
                        console.log("Processing acta:", acta); // Log the acta being processed
                        const jugador = jugadoresJson.data.find(j => Number(j.id) === Number(acta.jugador_id));

                        if (jugador) {
                            console.log("Found jugador:", jugador); // Log the found jugador
                            const equipo = equiposConEstadisticas.find(e => Number(e.id) === Number(jugador.equipo_id));

                            if (equipo) {
                                console.log("Found equipo:", equipo); // Log the found equipo
                                if (acta.incidencia === 'amarilla') {
                                    console.log("Before amarilla:", equipo.nombre, equipo.tarjetasAmarillas);
                                    equipo.tarjetasAmarillas++;
                                    console.log("Amarilla added to", equipo.nombre, "Total:", equipo.tarjetasAmarillas); // Log when a yellow card is added
                                    console.log("After amarilla:", equipo.nombre, equipo.tarjetasAmarillas);
                                } else if (acta.incidencia === 'roja') {
                                    console.log("Before roja:", equipo.nombre, equipo.tarjetasRojas);
                                    equipo.tarjetasRojas++;
                                    console.log("Roja added to", equipo.nombre, "Total:", equipo.tarjetasRojas); // Log when a red card is added
                                    console.log("After roja:", equipo.nombre, equipo.tarjetasRojas);
                                }
                            } else {
                                console.log("Equipo not found for jugador:", jugador); // Log if equipo is not found
                            }
                        } else {
                            console.log("Jugador not found for acta:", acta); // Log if jugador is not found
                        }
                    });
                };

                procesarTarjetasEquipo();

                // Filter and set tables
                const tabla1 = equiposConEstadisticas.filter(e => e.grupo === 'A');
                const tabla2 = equiposConEstadisticas.filter(e => e.grupo === 'B');

                setEquipos({ tabla1, tabla2 });
            } catch (error) {
                setMensaje("Error al cargar los datos");
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    const ordenarEquipos = (equipos) => {
        return equipos.sort((a, b) => {
            // Ordenar por puntos (de mayor a menor)
            if (b.puntos !== a.puntos) {
                return b.puntos - a.puntos;
            }
            // Si hay empate, ordenar por diferencia de goles
            const diferenciaGolesA = a.golesFavor - a.golesContra;
            const diferenciaGolesB = b.golesFavor - b.golesContra;
            if (diferenciaGolesB !== diferenciaGolesA) {
                return diferenciaGolesB - diferenciaGolesA;
            }
            // Si sigue el empate, ordenar por goles a favor
            if (b.golesFavor !== a.golesFavor) {
                return b.golesFavor - a.golesFavor;
            }
            // Si sigue el empate, ordenar por menor número de tarjetas rojas
            if (a.tarjetasRojas !== b.tarjetasRojas) {
                return a.tarjetasRojas - b.tarjetasRojas;
            }
            // Si sigue el empate, ordenar por menor número de tarjetas amarillas
            return a.tarjetasAmarillas - b.tarjetasAmarillas;
        });
    };

    return {
        equipos,
        cargando,
        mensaje,
        ordenarEquipos
    };
}

export default LogicaClasificacion;