export const getEquipos = async () => {
  try {
    const response = await fetch("/api/equipos");
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    throw new Error("Error al obtener los equipos: " + err.message);
  }
};

export const addEquipo = async (equipoData) => {
  try {
    const response = await fetch("/api/equipos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        nombre: equipoData.nombre,
        centro_id: equipoData.centro_id,
        grupo: equipoData.grupo
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al agregar el equipo');
    }

    const data = await response.json();
    return data.equipo; // El controller devuelve { message, equipo }
  } catch (err) {
    throw new Error(`Error al agregar el equipo: ${err.message}`);
  }
};

export const updateEquipo = async (equipoId, equipoData) => {
  try {
    const response = await fetch(`/api/equipos/${equipoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        nombre: equipoData.nombre,
        centro_id: equipoData.centro_id,
        grupo: equipoData.grupo
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el equipo');
    }

    const data = await response.json();
    return data.data; // El controller devuelve un EquipoResource
  } catch (err) {
    throw new Error(`Error al actualizar el equipo: ${err.message}`);
  }
};

export const deleteEquipo = async (equipoId) => {
  try {
    const response = await fetch(`/api/equipos/${equipoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el equipo');
    }

    return true;
  } catch (err) {
    throw new Error(`Error al eliminar el equipo: ${err.message}`);
  }
};

export const getJugadoresByEquipo = async (equipoId) => {
  try {
    // Obtenemos todos los jugadores y filtramos por equipo_id
    const response = await fetch("/api/jugadores");
    if (!response.ok) {
      throw new Error("Error al obtener los jugadores");
    }
    const data = await response.json();
    // Filtramos los jugadores que pertenecen al equipo
    const jugadoresDelEquipo = data.data.filter(jugador => jugador.equipo_id === equipoId);
    return jugadoresDelEquipo;
  } catch (err) {
    throw new Error("Error al obtener los jugadores: " + err.message);
  }
};