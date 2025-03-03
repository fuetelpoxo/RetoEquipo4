
// Cache para equipos
let equiposCache = null;
let lastFetchEquipos = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Función optimizada para obtener equipos
const getEquiposCache = async () => {
  const now = Date.now();
  if (equiposCache && (now - lastFetchEquipos < CACHE_DURATION)) {
    return equiposCache;
  }

  const response = await fetch("/api/equipos");
  if (!response.ok) throw new Error("Error al obtener equipos");
  const data = await response.json();
  equiposCache = data.data;
  lastFetchEquipos = now;
  return equiposCache;
};

// Función para obtener el nombre del equipo
export const getEquipoById = async (equipoId) => {
  try {
    const equipos = await getEquiposCache();
    return equipos.find(e => e.id === equipoId) || null;
  } catch (err) {
    console.error("Error al obtener el equipo:", err);
    return null;
  }
};

export const getJugadores = async () => {
  try {
    const [jugadoresResponse, equiposResponse] = await Promise.all([
      fetch("/api/jugadores"),
      getEquiposCache()
    ]);

    if (!jugadoresResponse.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const jugadoresData = await jugadoresResponse.json();
    
    // Procesar jugadores con nombres de equipo en una sola iteración
    return jugadoresData.data.map(jugador => ({
      ...jugador,
      nombreEquipo: equiposResponse.find(e => e.id === jugador.equipo_id)?.nombre || 'Sin equipo'
    }));
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
    const equipo = await getEquipoById(jugadorData.equipo_id);
    
    return {
      ...data.data,
      nombreEquipo: equipo?.nombre || 'Sin equipo'
    };
  } catch (err) {
    throw new Error(`Error al agregar el jugador: ${err.message}`);
  }
};

export const updateJugador = async (jugadorId, jugadorData) => {
  try {
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
    const equipo = await getEquipoById(jugadorData.equipo_id);

    return {
      ...data.data,
      nombreEquipo: equipo?.nombre || 'Sin equipo'
    };
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
    return await getEquiposCache();
  } catch (err) {
    throw new Error("Error al obtener los equipos: " + err.message);
  }
};

export const getEstudiosSelect = async () => {
  try {
    // Get both estudios and ciclos data
    const [estudiosResponse, ciclosResponse] = await Promise.all([
      fetch('/api/estudios'),
      fetch('/api/ciclos')
    ]);

    if (!estudiosResponse.ok || !ciclosResponse.ok) {
      throw new Error('Error al obtener los datos');
    }

    const estudiosData = await estudiosResponse.json();
    const ciclosData = await ciclosResponse.json();

    // Format estudios with ciclo name and curso
    const estudiosFormateados = estudiosData.data.map(estudio => {
      const ciclo = ciclosData.data.find(c => c.id === estudio.ciclo_id);
      return {
        id: estudio.id,
        nombre: `${ciclo?.nombre || 'Sin ciclo'} ${estudio.curso}º`, // Example: "DAW 2º"
        centro_id: estudio.centro_id,
        ciclo_id: estudio.ciclo_id,
        curso: estudio.curso
      };
    });

    return estudiosFormateados;
  } catch (error) {
    console.error('Error al obtener estudios:', error);
    throw error;
  }
};

export const uploadImagenJugador = async (imageFile, jugadorId, nombreImagen) => {
  try {
    const formData = new FormData();
    formData.append('imagen', imageFile);
    formData.append('nombre', nombreImagen);
    formData.append('jugador_id', jugadorId);

    console.log('Enviando imagen:', {
      fileName: imageFile.name,
      fileSize: imageFile.size,
      fileType: imageFile.type,
      jugadorId: jugadorId,
      nombreImagen: nombreImagen
    });

    const response = await fetch('/api/imagenes', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al subir la imagen');
      } else {
        const text = await response.text();
        console.error('Respuesta no JSON:', text);
        throw new Error('Error del servidor al subir la imagen');
      }
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error('Error detallado:', err);
    throw err;
  }
};