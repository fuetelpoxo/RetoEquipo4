import { useState, useEffect } from "react";
import { getJugadores, addJugador, updateJugador, deleteJugador } from "../models/JugadorModel";

export const useJugadores = () => {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJugadores = async () => {
    try {
      setLoading(true);
      const data = await getJugadores();
      setJugadores(data);
      setError(null);
    } catch (err) {
      setError("Error al obtener los jugadores");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJugadores();
  }, []);

  const handleAddJugador = async (jugadorData) => {
    try {
      const newJugador = await addJugador(jugadorData);
      await fetchJugadores(); // Recargar la lista completa
      return newJugador;
    } catch (err) {
      setError(`Error al agregar el jugador: ${err.message}`);
      throw err;
    }
  };

  const handleUpdateJugador = async (jugadorId, jugadorData) => {
    try {
      const updatedJugador = await updateJugador(jugadorId, jugadorData);
      
      // Obtener el nombre del equipo
      let nombreEquipo = 'Sin equipo';
      if (updatedJugador.equipo_id) {
        try {
          const equipoResponse = await fetch(`/api/equipos/${updatedJugador.equipo_id}`);
          if (equipoResponse.ok) {
            const equipoData = await equipoResponse.json();
            nombreEquipo = equipoData.data.nombre;
          }
        } catch (error) {
          console.error('Error al obtener equipo:', error);
        }
      }

      // Actualizar el estado con el jugador actualizado incluyendo el nombre del equipo
      setJugadores(jugadores.map(jugador => 
        jugador.id === jugadorId ? {
          ...updatedJugador,
          nombreEquipo
        } : jugador
      ));

      return updatedJugador;
    } catch (err) {
      setError(`Error al actualizar el jugador: ${err.message}`);
      throw err;
    }
  };

  const handleDeleteJugador = async (jugadorId) => {
    try {
      await deleteJugador(jugadorId);
      setJugadores(jugadores.filter(jugador => jugador.id !== jugadorId));
    } catch (err) {
      setError(`Error al eliminar el jugador: ${err.message}`);
      throw err;
    }
  };

  return {
    jugadores,
    loading,
    error,
    handleAddJugador,
    handleUpdateJugador,
    handleDeleteJugador,
    refreshJugadores: fetchJugadores
  };
};