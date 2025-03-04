import React, { useState, useEffect } from 'react';

function LogicaClasificacion() {
    const [equipos, setEquipos] = useState({ tabla1: [], tabla2: [] });
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [partidosData, setPartidosData] = useState([]);
    const [equiposData, setEquiposData] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const [equiposRes, partidosRes] = await Promise.all([
                    fetch('/api/equipos'),
                    fetch('/api/partidos')
                ]);

                const [equiposJson, partidosJson] = await Promise.all([
                    equiposRes.json(),
                    partidosRes.json()
                ]);

                setEquiposData(equiposJson.data || []);
                setPartidosData(partidosJson.data || []);

                if (!equiposJson.data?.length) {
                    setMensaje("No hay equipos disponibles");
                    return;
                }

                const equiposConEstadisticas = equiposJson.data.map(equipo => ({
                    id: Number(equipo.id),
                    nombre: equipo.nombre,
                    grupo: equipo.grupo,
                    puntos: 0,
                    partidosJugados: 0,
                    partidosGanados: 0,
                    partidosEmpatados: 0,
                    partidosPerdidos: 0,
                    golesFavor: 0,
                    golesContra: 0,
                    diferenciaGoles: 0
                }));

                equiposConEstadisticas.forEach(estadisticas => {
                    partidosJson.data.forEach(partido => {
                        const golesLocal = Number(partido.golesL) || 0;
                        const golesVisitante = Number(partido.golesV) || 0;

                        if (partido.equipoL_id === estadisticas.id) {
                            estadisticas.partidosJugados++;
                            estadisticas.golesFavor += golesLocal;
                            estadisticas.golesContra += golesVisitante;
                            
                            if (golesLocal > golesVisitante) {
                                estadisticas.puntos += 3;
                                estadisticas.partidosGanados++;
                            } else if (golesLocal === golesVisitante) {
                                estadisticas.puntos += 1;
                                estadisticas.partidosEmpatados++;
                            } else {
                                estadisticas.partidosPerdidos++;
                            }
                        } else if (partido.equipoV_id === estadisticas.id) {
                            estadisticas.partidosJugados++;
                            estadisticas.golesFavor += golesVisitante;
                            estadisticas.golesContra += golesLocal;
                            
                            if (golesVisitante > golesLocal) {
                                estadisticas.puntos += 3;
                                estadisticas.partidosGanados++;
                            } else if (golesVisitante === golesLocal) {
                                estadisticas.puntos += 1;
                                estadisticas.partidosEmpatados++;
                            } else {
                                estadisticas.partidosPerdidos++;
                            }
                        }
                    });

                    estadisticas.diferenciaGoles = estadisticas.golesFavor - estadisticas.golesContra;
                });

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
            // Primer desempate: Puntos
            if (b.puntos !== a.puntos) return b.puntos - a.puntos;
            // Segundo desempate: Diferencia de goles
            if (b.diferenciaGoles !== a.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles;
            // Tercer desempate: Goles a favor
            if (b.golesFavor !== a.golesFavor) return b.golesFavor - a.golesFavor;
            // Cuarto desempate: Partidos ganados
            return b.partidosGanados - a.partidosGanados;
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