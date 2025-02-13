class EquiposService {
    static async obtenerEquipos() {
        // Simulación de la llamada a la API
        const data = {
            tabla1: [
                { id: 1, nombre: "Equipo A", puntos: 25, golesFavor: 30, golesContra: 20, diferenciaGoles: 30 - 20, tarjetasAmarillas: 5, tarjetasRojas: 1 },
                { id: 2, nombre: "Equipo B", puntos: 27, golesFavor: 35, golesContra: 25, diferenciaGoles: 35 - 25, tarjetasAmarillas: 4, tarjetasRojas: 0 },
                { id: 3, nombre: "Equipo C", puntos: 20, golesFavor: 22, golesContra: 30, diferenciaGoles: 22 - 30, tarjetasAmarillas: 3, tarjetasRojas: 1 },
                { id: 4, nombre: "Equipo D", puntos: 18, golesFavor: 18, golesContra: 28, diferenciaGoles: 18 - 28, tarjetasAmarillas: 6, tarjetasRojas: 2 },
                { id: 5, nombre: "Equipo E", puntos: 15, golesFavor: 20, golesContra: 35, diferenciaGoles: 20 - 35, tarjetasAmarillas: 2, tarjetasRojas: 1 }
            ],
            tabla2: [
                { id: 6, nombre: "Equipo F", puntos: 30, golesFavor: 40, golesContra: 15, diferenciaGoles: 40 - 15, tarjetasAmarillas: 7, tarjetasRojas: 0 },
                { id: 7, nombre: "Equipo G", puntos: 28, golesFavor: 38, golesContra: 20, diferenciaGoles: 38 - 20, tarjetasAmarillas: 5, tarjetasRojas: 1 },
                { id: 8, nombre: "Equipo H", puntos: 25, golesFavor: 33, golesContra: 28, diferenciaGoles: 33 - 28, tarjetasAmarillas: 4, tarjetasRojas: 0 },
                { id: 9, nombre: "Equipo I", puntos: 22, golesFavor: 27, golesContra: 26, diferenciaGoles: 27 - 26, tarjetasAmarillas: 3, tarjetasRojas: 2 },
                { id: 10, nombre: "Equipo J", puntos: 20, golesFavor: 24, golesContra: 32, diferenciaGoles: 24 - 32, tarjetasAmarillas: 6, tarjetasRojas: 1 }
            ]
        };

        // Retornar los datos simulados
        return data;
    }
}

export default EquiposService;
