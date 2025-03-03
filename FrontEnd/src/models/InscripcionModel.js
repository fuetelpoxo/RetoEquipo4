import { getEquipos } from './EquipoModel';

export const getInscripciones = async () => {
  try {
    // Obtener inscripciones y equipos en paralelo para optimizar
    const [inscripcionesResponse, equiposResponse] = await Promise.all([
      fetch("/api/inscripciones"),
      getEquipos()
    ]);
    
    if (!inscripcionesResponse.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const inscripcionesData = await inscripcionesResponse.json();
    
    // Mapear las inscripciones con los nombres de equipo
    const inscripcionesConEquipo = inscripcionesData.data.map(inscripcion => {
      const equipoEncontrado = equiposResponse.find(e => e.id === inscripcion.equipo_id);
      return {
        ...inscripcion,
        nombreEquipo: equipoEncontrado ? equipoEncontrado.nombre : 'Sin equipo'
      };
    });

    return inscripcionesConEquipo;
  } catch (err) {
    throw new Error("Error al obtener las inscripciones: " + err.message);
  }
};

export const createInscripcion = async (inscripcionData) => {
  try {
    const response = await fetch("/api/inscripciones", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comentarios: inscripcionData.comentarios,
        estado: 'pendiente',
        nombre_equipo: inscripcionData.nombre_equipo,
        jugadores: inscripcionData.jugadores
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear la inscripción');
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    if (err.message.includes('<!doctype')) {
      throw new Error('Error de conexión con el servidor');
    }
    throw new Error(`Error al crear la inscripción: ${err.message}`);
  }
};

export const updateInscripcion = async (id, inscripcionData) => {
  try {
    const response = await fetch(`/api/inscripciones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inscripcionData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar la inscripción');
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    throw new Error(`Error al actualizar la inscripción: ${err.message}`);
  }
};