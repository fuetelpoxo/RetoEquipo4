// PartidosService.js
import EquiposService from './EquiposService';

class PartidosService {
    static async obtenerPartidos() {
        const dataEquipos = await EquiposService.obtenerEquipos();

        // Creación de partidos a partir de los equipos con la hora
        const partidosFinales = [
            { fecha: '2025-02-20', hora: '18:00', partido: 'Final', equipo1: dataEquipos.tabla1[0].nombre, equipo2: dataEquipos.tabla2[1].nombre },
        ];

        const partidosSemis = [
            { fecha: '2025-02-18', hora: '20:00', partido: 'Semifinal 1', equipo1: dataEquipos.tabla1[0].nombre, equipo2: dataEquipos.tabla2[2].nombre },
            { fecha: '2025-02-19', hora: '22:00', partido: 'Semifinal 2', equipo1: dataEquipos.tabla1[2].nombre, equipo2: dataEquipos.tabla2[3].nombre },
        ];

        const tabla1 = [
            { fecha: '2025-02-17', hora: '16:00', partido: 'Partido 1', equipo1: dataEquipos.tabla1[3].nombre, equipo2: dataEquipos.tabla1[4].nombre },
        ];

        const tabla2 = [
            { fecha: '2025-02-22', hora: '19:00', partido: 'Partido 2', equipo1: dataEquipos.tabla2[0].nombre, equipo2: dataEquipos.tabla2[4].nombre },
        ];

        return {
            finales: partidosFinales,
            semifinales: partidosSemis,
            tabla1: tabla1,
            tabla2: tabla2,
        };
    }
}

export default PartidosService;
