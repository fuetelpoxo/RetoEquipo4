import { getPartidos } from './PartidoModel';
import { getJugadores } from './JugadorModel';

export const getActas = async () => {
  try {
    // Obtener todo en paralelo igual que en AddActa
    const [actasResponse, partidosData] = await Promise.all([
      fetch("/api/actas"),
      getPartidos() // Esta función ya procesa los nombres de equipos correctamente
    ]);

    if (!actasResponse.ok) {
      throw new Error("Error al obtener los datos");
    }

    const actasData = await actasResponse.json();

    // Mapear las actas usando los datos de partidos que YA TIENEN los nombres procesados
    const actasTransformadas = actasData.data.map(acta => {
      // Encontrar el partido que corresponde a esta acta
      const partido = partidosData.find(p => p.id === acta.partido_id);

      return {
        ...acta,
        partido: partido ? {
          ...partido,
          // Usar los mismos nombres que vienen de getPartidos()
          equipoLocalNombre: partido.equipoLocalNombre,
          equipoVisitanteNombre: partido.equipoVisitanteNombre
        } : null,
        jugadorNombre: acta.jugador ? 
          `${acta.jugador.nombre} ${acta.jugador.apellido1}` : 
          'Jugador no encontrado'
      };
    });

    return actasTransformadas;
  } catch (err) {
    console.error("Error completo:", err);
    throw new Error("Error al obtener las actas: " + err.message);
  }
};

export const addActa = async (actaData) => {
  try {
    const response = await fetch("/api/actas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(actaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear el acta");
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    throw new Error(`Error al crear el acta: ${err.message}`);
  }
};

export const updateActa = async (actaId, actaData) => {
  try {
    const response = await fetch(`/api/actas/${actaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(actaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el acta");
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    throw new Error(`Error al actualizar el acta: ${err.message}`);
  }
};

export const deleteActa = async (actaId) => {
  try {
    const response = await fetch(`/api/actas/${actaId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("No se pudo eliminar el acta");
    }

    return true;
  } catch (err) {
    throw new Error(`Error al eliminar el acta: ${err.message}`);
  }
};