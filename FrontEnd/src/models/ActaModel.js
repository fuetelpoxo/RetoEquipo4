// Función auxiliar para obtener datos de partidos, jugadores y equipos en paralelo
const getPartidosYJugadores = async () => {
  try {
    const [partidosResponse, jugadoresResponse] = await Promise.all([
      fetch("/api/partidos"),
      fetch("/api/jugadores")
    ]);

    if (!partidosResponse.ok || !jugadoresResponse.ok) {
      throw new Error("Error al obtener datos relacionados");
    }

    const partidos = await partidosResponse.json();
    const jugadores = await jugadoresResponse.json();

    return {
      partidos: partidos.data,
      jugadores: jugadores.data.map(j => ({
        ...j,
        nombreCompleto: `${j.nombre} ${j.apellido1}`,
        nombreEquipo: j.equipo?.nombre || 'Sin equipo'
      }))
    };
  } catch (err) {
    throw new Error("Error al cargar datos relacionados: " + err.message);
  }
};

export const getActas = async () => {
  try {
    // Obtener las actas
    const actasResponse = await fetch("/api/actas");
    if (!actasResponse.ok) {
      throw new Error("Error al obtener las actas");
    }
    const actasData = await actasResponse.json();

    // Transformar los datos usando la información que YA VIENE del backend
    const actasTransformadas = actasData.data.map(acta => ({
      ...acta,
      jugadorNombre: acta.jugador ? `${acta.jugador.nombre} ${acta.jugador.apellido1}` : 'Jugador no encontrado',
      partidoInfo: acta.partido ? 
        `${acta.partido.equipoLocal?.nombre || 'Local'} vs ${acta.partido.equipoVisitante?.nombre || 'Visitante'}` : 
        'Partido no encontrado'
    }));

    return actasTransformadas;
  } catch (err) {
    throw new Error("Error: " + err.message);
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