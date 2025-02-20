import { useState, useEffect } from 'react';
import { getInscripciones, createInscripcion, updateInscripcion } from '../models/InscripcionModel';

export const useInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInscripciones();
  }, []);

  const fetchInscripciones = async () => {
    try {
      const data = await getInscripciones();
      setInscripciones(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInscripcion = async (inscripcionData) => {
    try {
      const nuevaInscripcion = await createInscripcion(inscripcionData);
      setInscripciones([...inscripciones, nuevaInscripcion]);
      return nuevaInscripcion;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleUpdateInscripcion = async (id, inscripcionData) => {
    try {
      const inscripcionActualizada = await updateInscripcion(id, inscripcionData);
      setInscripciones(inscripciones.map(i => 
        i.id === id ? inscripcionActualizada : i
      ));
      return inscripcionActualizada;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    inscripciones,
    loading,
    error,
    handleCreateInscripcion,
    handleUpdateInscripcion,
    refreshInscripciones: fetchInscripciones
  };
};