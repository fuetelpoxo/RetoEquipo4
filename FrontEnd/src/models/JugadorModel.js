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
                nombreEquipo: equipoData.data.nombre // Accedemos al nombre dentro de data
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
      // Si ambos tienen equipo_id, compara por equipo primero
      if (a.equipo_id && b.equipo_id) {
        const equipoComparison = a.equipo_id - b.equipo_id;
        if (equipoComparison !== 0) return equipoComparison;
        return a.nombre.localeCompare(b.nombre);
      }
      // Si uno no tiene equipo_id, va al final
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
    // Obtener el jugador actual
    const currentResponse = await fetch(`/api/jugadores/${jugadorId}`);
    const currentJugador = await currentResponse.json();

    // Si el email no ha cambiado, lo eliminamos de los datos a actualizar
    if (currentJugador.data.email === jugadorData.email) {
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
    const response = await fetch('/api/estudios');
    if (!response.ok) {
      throw new Error('Error al obtener estudios');
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error('Error en getEstudiosSelect:', err);
    throw err;
  }
};