import { useState, useEffect } from "react";

export function useLogicaFaseFinal() {
    const [equipos, setEquipos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch equipos y partidos
                const [equiposRes, partidosRes] = await Promise.all([
                    fetch('/api/equipos'),
                    fetch('/api/partidos')
                ]);

                if (!equiposRes.ok || !partidosRes.ok) {
                    throw new Error('Error al obtener datos');
                }

                const equiposData = await equiposRes.json();
                const partidosData = await partidosRes.json();

                // Procesar equipos por grupo
                const equiposGrupoA = equiposData.data.filter(equipo => equipo.grupo === 'A');
                const equiposGrupoB = equiposData.data.filter(equipo => equipo.grupo === 'B');

                // Calcular puntos y estadísticas para cada equipo
                const calcularEstadisticas = (equipos) => {
                    return equipos.map(equipo => {
                        const estadisticas = {
                            id: equipo.id,
                            nombre: equipo.nombre,
                            puntos: 0,
                            golesFavor: 0,
                            golesContra: 0
                        };

                        // Buscar partidos del equipo
                        partidosData.data.forEach(partido => {
                            if (partido.equipoL_id === equipo.id) {
                                estadisticas.golesFavor += partido.golesL || 0;
                                estadisticas.golesContra += partido.golesV || 0;
                                if (partido.golesL > partido.golesV) estadisticas.puntos += 3;
                                if (partido.golesL === partido.golesV) estadisticas.puntos += 1;
                            }
                            if (partido.equipoV_id === equipo.id) {
                                estadisticas.golesFavor += partido.golesV || 0;
                                estadisticas.golesContra += partido.golesL || 0;
                                if (partido.golesV > partido.golesL) estadisticas.puntos += 3;
                                if (partido.golesV === partido.golesL) estadisticas.puntos += 1;
                            }
                        });

                        return estadisticas;
                    });
                };

                // Obtener estadísticas por grupo
                const estadisticasGrupoA = calcularEstadisticas(equiposGrupoA);
                const estadisticasGrupoB = calcularEstadisticas(equiposGrupoB);

                // Función para obtener los dos mejores equipos
                const getTopTeams = (grupo) => {
                    return grupo
                        .sort((a, b) => {
                            if (b.puntos !== a.puntos) {
                                return b.puntos - a.puntos;
                            }
                            const diffA = a.golesFavor - a.golesContra;
                            const diffB = b.golesFavor - b.golesContra;
                            return diffB - diffA;
                        })
                        .slice(0, 2);
                };

                // Obtener los mejores equipos de cada grupo
                const topTeamsGrupoA = getTopTeams(estadisticasGrupoA);
                const topTeamsGrupoB = getTopTeams(estadisticasGrupoB);

                // Establecer los equipos para la fase final
                setEquipos({
                    equipo1: topTeamsGrupoA[0],
                    equipo2: topTeamsGrupoB[0],
                    equipo3: topTeamsGrupoA[1],
                    equipo4: topTeamsGrupoB[1],
                    resultadoSemi1: null,
                    resultadoSemi2: null,
                    ganadorSemi1: null,
                    ganadorSemi2: null,
                    resultadoFinal: null,
                });

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const avanzarEquipo = (fase, equipoGanador) => {
        setEquipos(prevEquipos => {
            const newEquipos = { ...prevEquipos };

            switch (fase) {
                case 'semi1':
                    newEquipos.ganadorSemi1 = equipoGanador;
                    newEquipos.resultadoSemi1 = {
                        ganador: equipoGanador,
                        perdedor: equipoGanador.id === prevEquipos.equipo1.id ? prevEquipos.equipo4 : prevEquipos.equipo1
                    };
                    break;
                case 'semi2':
                    newEquipos.ganadorSemi2 = equipoGanador;
                    newEquipos.resultadoSemi2 = {
                        ganador: equipoGanador,
                        perdedor: equipoGanador.id === prevEquipos.equipo2.id ? prevEquipos.equipo3 : prevEquipos.equipo2
                    };
                    break;
                case 'tercero':
                    newEquipos.tercerPuesto = equipoGanador;
                    break;
                case 'final':
                    newEquipos.campeon = equipoGanador;
                    break;
            }

            return newEquipos;
        });
    };

    return { equipos, loading, error, avanzarEquipo };
}