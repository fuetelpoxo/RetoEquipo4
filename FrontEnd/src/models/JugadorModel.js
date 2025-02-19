// Función para obtener el nombre del equipo
export const getEquipoById = async (equipoId) => {
  try {
    const response = await fetch(`/api/equipos/${equipoId}`);
    if (!response.ok) {
      throw new Error("Error al obtener el equipo");
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Error al obtener el equipo:", err);
    return null;
  }
};

export const getJugadores = async () => {
  try {
    const response = await fetch("/api/jugadores");
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    const jugadores = data.data;

    // Obtener el nombre del equipo para cada jugador
    const jugadoresConEquipo = await Promise.all(
      jugadores.map(async (jugador) => {
        if (jugador.equipo_id) {
          try {
            const equipoResponse = await fetch(`/api/equipos/${jugador.equipo_id}`);
            if (equipoResponse.ok) {
              const equipoData = await equipoResponse.json();
              return {
                ...jugador,
                nombreEquipo: equipoData.data.nombre || 'Sin nombre'
              };
            }
          } catch (error) {
            console.error(`Error al obtener equipo ${jugador.equipo_id}:`, error);
          }
        }
        return {
          ...jugador,
          nombreEquipo: 'Sin equipo'
        };
      })
    );

    // Ordenar primero por equipo y luego por nombre
    return jugadoresConEquipo.sort((a, b) => {
      if (a.equipo_id && b.equipo_id) {
        const equipoComparison = a.nombreEquipo.localeCompare(b.nombreEquipo);
        if (equipoComparison !== 0) return equipoComparison;
        return a.nombre.localeCompare(b.nombre);
      }
      if (!a.equipo_id) return 1;
      if (!b.equipo_id) return -1;
      return 0;
    });
  } catch (err) {
    throw new Error("Error al obtener los jugadores: " + err.message);
  }
};

export const addJugador = async (jugadorData) => {
  try {
    const response = await fetch("/api/jugadores", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(jugadorData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al agregar el jugador');
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    throw new Error(`Error al agregar el jugador: ${err.message}`);
  }
};

export const updateJugador = async (jugadorId, jugadorData) => {
  try {
    // Si el email no ha cambiado, lo eliminamos
    if (jugadorData.email === undefined || jugadorData.email === '') {
      delete jugadorData.email;
    }

    const response = await fetch(`/api/jugadores/${jugadorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(jugadorData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el jugador');
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error('Error en updateJugador:', err);
    throw err;
  }
};

export const deleteJugador = async (jugadorId) => {
  try {
    const response = await fetch(`/api/jugadores/${jugadorId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el jugador');
    }

    return true;
  } catch (err) {
    throw new Error(`Error al eliminar el jugador: ${err.message}`);
  }
};

export const getEquiposSelect = async () => {
  try {
    const response = await fetch("/api/equipos");
    if (!response.ok) {
      throw new Error("Error al obtener los equipos");
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    throw new Error("Error al obtener los equipos: " + err.message);
  }
};

export const getEstudiosSelect = async () => {
  try {
    // Obtener estudios
    const responseEstudios = await fetch('/api/estudios');
    if (!responseEstudios.ok) {
      throw new Error('Error al obtener estudios');
    }
    const estudiosData = await responseEstudios.json();
    const estudios = estudiosData.data;

    // Obtener ciclos
    const responseCiclos = await fetch('/api/ciclos');
    if (!responseCiclos.ok) {
      throw new Error('Error al obtener ciclos');
    }
    const ciclosData = await responseCiclos.json();
    const ciclos = ciclosData.data;

    // Combinar la información
    const estudiosConCiclo = estudios.map(estudio => {
      const ciclo = ciclos.find(c => c.id === estudio.ciclo_id);
      return {
        ...estudio,
        ciclo: {
          id: ciclo?.id || '',
          nombre: ciclo?.nombre || 'Ciclo no encontrado'
        }
      };
    });

    return estudiosConCiclo;
  } catch (err) {
    console.error('Error en getEstudiosSelect:', err);
    throw err;
  }
};