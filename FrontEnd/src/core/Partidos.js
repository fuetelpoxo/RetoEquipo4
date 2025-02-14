// PartidosService.js
import EquiposService from './EquiposService';

class PartidosService {
    static async obtenerPartidos() {
        const dataEquipos = await EquiposService.obtenerEquipos();

        // Creación de partidos a partir de los equipos (como ejemplo, simplemente se generan combinaciones)
        const partidosFinales = [
            { fecha: '2025-02-20', partido: 'Final', equipo1: dataEquipos.tabla1[0].nombre, equipo2: dataEquipos.tabla2[1].nombre },
        ];

        const partidosSemis = [
            { fecha: '2025-02-18', partido: 'Semifinal 1', equipo1: dataEquipos.tabla1[0].nombre, equipo2: dataEquipos.tabla2[2].nombre },
            { fecha: '2025-02-19', partido: 'Semifinal 2', equipo1: dataEquipos.tabla1[2].nombre, equipo2: dataEquipos.tabla2[3].nombre },
        ];

        // Ahora tenemos "Tabla 1" y "Tabla 2"
        const tabla1 = [
            { fecha: '2025-02-17', partido: 'Partido 1', equipo1: dataEquipos.tabla1[3].nombre, equipo2: dataEquipos.tabla1[4].nombre },
        ];

        const tabla2 = [
            { fecha: '2025-02-22', partido: 'Partido 2', equipo1: dataEquipos.tabla2[0].nombre, equipo2: dataEquipos.tabla2[4].nombre },
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
