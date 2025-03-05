import { useState, useEffect, useCallback } from "react";
import { getEquipos, addEquipo, updateEquipo, deleteEquipo, getJugadoresByEquipo } from "../models/EquipoModel";

export const useEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEquipos = async () => {
    try {
      setLoading(true);
      const data = await getEquipos();
      setEquipos(data);
      setError(null);
    } catch (err) {
      setError("Error al obtener los equipos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJugadoresByEquipo = useCallback(async (equipoId) => {
    try {
      const jugadores = await getJugadoresByEquipo(equipoId);
      return jugadores;
    } catch (err) {
      throw new Error(`Error al obtener los jugadores: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchEquipos();
  }, []);

  const handleAddEquipo = async (equipoData) => {
    try {
      const newEquipo = await addEquipo(equipoData);
      await fetchEquipos(); // Recargar la lista completa
      return newEquipo;
    } catch (err) {
      setError(`Error al agregar el equipo: ${err.message}`);
      throw err;
    }
  };

  const handleUpdateEquipo = async (equipoId, equipoData) => {
    try {
      const updatedEquipo = await updateEquipo(equipoId, equipoData);
      setEquipos(equipos.map(equipo => 
        equipo.id === equipoId ? updatedEquipo : equipo
      ));
      return updatedEquipo;
    } catch (err) {
      setError(`Error al actualizar el equipo: ${err.message}`);
      throw err;
    }
  };

  const handleDeleteEquipo = async (equipoId) => {
    try {
      await deleteEquipo(equipoId);
      setEquipos(equipos.filter(equipo => equipo.id !== equipoId));
    } catch (err) {
      setError(`Error al eliminar el equipo: ${err.message}`);
      throw err;
    }
  };

  return {
    equipos,
    loading,
    error,
    handleAddEquipo,
    handleUpdateEquipo,
    handleDeleteEquipo,
    fetchJugadoresByEquipo,
    refreshEquipos: fetchEquipos
  };
};

