import { useState, useEffect } from 'react';
import { getPartidos } from '../models/PartidoModel';
import { getJugadores } from '../models/JugadorModel';

export const useActas = (usuarioId = null) => {
  const [actas, setActas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partidos, setPartidos] = useState({});
  const [jugadores, setJugadores] = useState({});

  const loadData = async () => {
    try {
      setLoading(true);
      // Obtener actas
      const actasResponse = await fetch('/api/actas');
      if (!actasResponse.ok) throw new Error('Error al cargar actas');
      const actasData = await actasResponse.json();

      // Filtrar actas por usuarioIdCreacion si se proporciona un usuarioId
      let actasFiltradas = actasData.data;
      if (usuarioId) {
        actasFiltradas = actasData.data.filter(acta => 
          acta.usuarioIdCreacion === usuarioId
        );
      }

      // Obtener partidos y jugadores
      const [partidosData, jugadoresData] = await Promise.all([
        getPartidos(),
        getJugadores()
      ]);

      // Crear mapas de partidos y jugadores por ID
      const partidosMap = partidosData.reduce((acc, partido) => ({
        ...acc,
        [partido.id]: {
          equipoLocal: { nombre: partido.equipoLocalNombre },
          equipoVisitante: { nombre: partido.equipoVisitanteNombre }
        }
      }), {});

      const jugadoresMap = jugadoresData.reduce((acc, jugador) => ({
        ...acc,
        [jugador.id]: {
          nombre: jugador.nombre,
          apellido1: jugador.apellido1
        }
      }), {});

      setPartidos(partidosMap);
      setJugadores(jugadoresMap);

      // Formatear las actas con la información relacionada
      const actasFormateadas = actasFiltradas.map(acta => ({
        ...acta,
        partido: partidosMap[acta.partido_id] || { equipoLocal: { nombre: 'N/A' }, equipoVisitante: { nombre: 'N/A' } },
        jugador: jugadoresMap[acta.jugador_id] || { nombre: 'N/A', apellido1: '' }
      }));

      setActas(actasFormateadas);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar las actas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddActa = async (actaData) => {
    try {
      const response = await fetch('/api/actas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actaData)
      });

      if (!response.ok) throw new Error('Error al crear el acta');
      await loadData(); // Recargar datos después de añadir
    } catch (error) {
      console.error('Error al agregar acta:', error);
      throw error;
    }
  };

  const handleUpdateActa = async (id, actaData) => {
    try {
      const response = await fetch(`/api/actas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actaData)
      });

      if (!response.ok) throw new Error('Error al actualizar el acta');
      await loadData(); // Recargar datos después de actualizar
    } catch (error) {
      console.error('Error al actualizar acta:', error);
      throw error;
    }
  };

  const handleDeleteActa = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta acta?')) {
      try {
        const response = await fetch(`/api/actas/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar el acta');
        await loadData(); // Recargar datos después de eliminar
      } catch (error) {
        console.error('Error al eliminar acta:', error);
        throw error;
      }
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