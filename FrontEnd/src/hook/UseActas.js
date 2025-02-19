import { useState, useEffect } from 'react';
import { getActas, addActa, updateActa, deleteActa } from '../models/ActaModel';

export const useActas = () => {
  const [actas, setActas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarActas();
  }, []);

  const cargarActas = async () => {
    try {
      setLoading(true);
      const data = await getActas();
      setActas(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActa = async (actaData) => {
    try {
      const newActa = await addActa(actaData);
      setActas([...actas, newActa]);
      return newActa;
    } catch (err) {
      setError(`Error al añadir el acta: ${err.message}`);
      throw err;
    }
  };

  const handleUpdateActa = async (actaId, actaData) => {
    try {
      const updatedActa = await updateActa(actaId, actaData);
      setActas(actas.map(acta => 
        acta.id === actaId ? updatedActa : acta
      ));
      return updatedActa;
    } catch (err) {
      setError(`Error al actualizar el acta: ${err.message}`);
      throw err;
    }
  };

  const handleDeleteActa = async (actaId) => {
    try {
      await deleteActa(actaId);
      setActas(actas.filter(acta => acta.id !== actaId));
    } catch (err) {
      setError(`Error al eliminar el acta: ${err.message}`);
      throw err;
    }
  };

  return {
    actas,
    loading,
    error,
    handleAddActa,
    handleUpdateActa,
    handleDeleteActa
  };
};