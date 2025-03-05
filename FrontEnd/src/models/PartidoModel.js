import { getEquipos } from './EquipoModel';

export const getPartidos = async () => {
  try {
    // Obtener partidos y equipos en paralelo
    const [partidosResponse, equiposData] = await Promise.all([
      fetch("/api/partidos"),
      getEquipos()
    ]);

    if (!partidosResponse.ok) throw new Error("Error al obtener partidos");
    
    const partidosData = await partidosResponse.json();

    // Mapear los partidos añadiendo los nombres de equipo
    const partidosConEquipos = partidosData.data.map(partido => {
      const equipoLocal = equiposData.find(e => e.id === partido.equipoL_id);
      const equipoVisitante = equiposData.find(e => e.id === partido.equipoV_id);

      return {
        ...partido,
        equipoLocalNombre: equipoLocal?.nombre || 'Equipo Local Desconocido',
        equipoVisitanteNombre: equipoVisitante?.nombre || 'Equipo Visitante Desconocido'
      };
    });

    return partidosConEquipos;
  } catch (err) {
    throw new Error("Error al cargar los partidos: " + err.message);
  }
};