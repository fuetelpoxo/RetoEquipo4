import { useState, useEffect } from 'react';
import { getEquipos } from '../models/EquipoModel';
import { getInscripciones, createInscripcion, updateInscripcion } from '../models/InscripcionModel';

export const useInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [inscripcionesResponse, equiposData] = await Promise.all([
        fetch("/api/inscripciones"),
        getEquipos()
      ]);
      
      if (!inscripcionesResponse.ok) {
        throw new Error("Error al obtener las inscripciones");
      }

      const inscripcionesData = await inscripcionesResponse.json();
      
      // Mapear las inscripciones con los nombres de equipo
      const inscripcionesConEquipo = inscripcionesData.data.map(inscripcion => {
        // Asegurar que el equipo_id sea un número
        const equipoId = parseInt(inscripcion.id);
        const equipo = equiposData.find(e => e.id === equipoId);
        return {
          ...inscripcion,
          equipo_id: equipoId, // Guardar el ID como número
          nombreEquipo: equipo ? equipo.nombre : 'Sin equipo'
        };
      });

      console.log('Inscripciones procesadas:', inscripcionesConEquipo);
      setInscripciones(inscripcionesConEquipo);
      setEquipos(equiposData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateInscripcion = async (data) => {
    try {
      await createInscripcion(data);
      await fetchData();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleUpdateInscripcion = async (id, data) => {
    try {
      await updateInscripcion(id, data);
      await fetchData();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    inscripciones,
    equipos,
    loading,
    error,
    handleCreateInscripcion,
    handleUpdateInscripcion
  };
};