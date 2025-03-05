import { getEquipos } from './EquipoModel';

export const getInscripciones = async () => {
  try {
    // Obtener inscripciones y equipos en paralelo para optimizar
    const [inscripcionesResponse, equiposData] = await Promise.all([
      fetch("/api/inscripciones"),
      getEquipos()
    ]);
    
    if (!inscripcionesResponse.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const inscripcionesData = await inscripcionesResponse.json();
    
    // Map inscripciones with team names
    const inscripcionesConEquipo = inscripcionesData.data.map(inscripcion => {
      const equipo = equiposData.find(e => e.id === inscripcion.equipo_id);
      return {
        ...inscripcion,
        nombreEquipo: equipo ? equipo.nombre : 'Sin equipo'
      };
    });

    return inscripcionesConEquipo;
  } catch (err) {
    throw new Error("Error al obtener las inscripciones: " + err.message);
  }
};

export const createInscripcion = async (inscripcionData) => {
  try {
    console.log('Datos a enviar:', inscripcionData);

    if (!inscripcionData.centro_id) {
      throw new Error('El id del centro es obligatorio');
    }

    // Crear primero el equipo
    const equipoResponse = await fetch("/api/equipos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nombre: inscripcionData.nombre_equipo.trim(),
        centro_id: parseInt(inscripcionData.centro_id),
        grupo: 'A',
        usuarioIdCreacion: 4
      })
    });

    if (!equipoResponse.ok) {
      const errorData = await equipoResponse.json();
      throw new Error(errorData.message || 'Error al crear el equipo');
    }

    const equipoData = await equipoResponse.json();
    const equipo_id = equipoData.data.id;

    // Crear jugadores con todos los campos requeridos
    const jugadoresPromises = inscripcionData.jugadores.map(jugador => 
      fetch("/api/jugadores", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre: jugador.nombre,
          apellido1: jugador.apellido1,
          apellido2: jugador.apellido2 || '',
          dni: jugador.dni,
          email: jugador.email,
          telefono: jugador.telefono,
          estudio_id: parseInt(jugador.estudio_id),
          equipo_id: equipo_id,
          rol: jugador.rol || 'jugador',
          fechaNacimiento: jugador.fechaNacimiento || null,
          tipo:jugador.tipo || 'jugador',
          usuarioIdCreacion: 4,
          usuarioIdActualizacion: 4,
          fechaCreacion: new Date().toISOString(),
          fechaActualizacion: new Date().toISOString()
        })
      })
    );

    const jugadoresResponses = await Promise.all(jugadoresPromises);
    
    // Verificar si algún jugador falló al crearse
    for (const response of jugadoresResponses) {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al crear jugador: ${errorData.message}`);
      }
    }

    // Crear la inscripción
    const response = await fetch("/api/inscripciones", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        equipo_id: equipo_id,
        estado: 'pendiente',
        comentarios: inscripcionData.comentarios || ''
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear la inscripción');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error completo:', err);
    throw err;
  }
};

export const updateInscripcion = async (id, inscripcionData) => {
  try {
    const response = await fetch(`/api/inscripciones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        comentarios: inscripcionData.comentarios,
        estado: inscripcionData.estado,
      })
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