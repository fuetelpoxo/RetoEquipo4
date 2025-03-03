import { useState, useEffect } from 'react';
import { useAuth } from '../context/UserContext';

export const useInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedInUser } = useAuth();

  const fetchInscripciones = async () => {
    try {
      const response = await fetch('/api/inscripciones');
      if (!response.ok) throw new Error('Error al cargar inscripciones');
      const data = await response.json();
      setInscripciones(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscripciones();
  }, []);

  const handleCreateInscripcion = async (data) => {
    try {
      console.log('Usuario logueado:', loggedInUser); // Ver el usuario actual
      console.log('Token:', localStorage.getItem('token')); // Ver el token

      // 1. Crear el equipo
      const equipoBody = {
        nombre: data.nombre_equipo,
        centro_id: parseInt(data.centro_id),
        grupo: 'A',
        usuarioIdCreacion: loggedInUser.id
      };
      console.log('Enviando equipo:', equipoBody); // Ver datos que enviamos

      const equipoResponse = await fetch('/api/equipos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(equipoBody)
      });

      // Log la respuesta completa
      console.log('Respuesta equipo:', await equipoResponse.clone().json());

      if (!equipoResponse.ok) {
        const errorData = await equipoResponse.json();
        throw new Error(`Error al crear equipo: ${errorData.message}`);
      }

      const equipoData = await equipoResponse.json();
      const equipo_id = equipoData.data.id;

      // 2. Crear la inscripción
      const inscripcionResponse = await fetch('/api/inscripciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          comentarios: data.comentarios || 'Inscripción pendiente de revisión',
          estado: 'pendiente',
          equipo_id: equipo_id,
          usuarioIdCreacion: loggedInUser.id
        })
      });

      if (!inscripcionResponse.ok) {
        const errorData = await inscripcionResponse.json();
        throw new Error(`Error al crear inscripción: ${errorData.message}`);
      }

      // 3. Crear los jugadores
      const jugadoresPromises = data.jugadores.map(jugador => 
        fetch('/api/jugadores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            equipo_id: equipo_id,
            nombre: jugador.nombre,
            apellido1: jugador.apellido1,
            apellido2: jugador.apellido2 || '',
            tipo: jugador.rol,
            estudio_id: parseInt(jugador.estudio_id),
            dni: jugador.dni.toUpperCase(),
            email: jugador.email,
            telefono: jugador.telefono,
            usuarioIdCreacion: loggedInUser.id
          })
        })
      );

      const jugadoresResponses = await Promise.all(jugadoresPromises);
      
      for (const response of jugadoresResponses) {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error al crear jugador: ${errorData.message}`);
        }
      }

      await fetchInscripciones();
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  };

  return {
    inscripciones,
    loading,
    error,
    handleCreateInscripcion
  };
};