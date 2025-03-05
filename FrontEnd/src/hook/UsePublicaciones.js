import { useState, useEffect } from 'react';
import { getPublicaciones, addPublicacion, updatePublicacion, deletePublicacion } from '../models/PublicacionModel';

export const usePublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPublicaciones = async () => {
    try {
      setLoading(true);
      const data = await getPublicaciones();
      setPublicaciones(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublicaciones();
  }, []);

  const handleAddPublicacion = async (publicacionData) => {
    try {
      await addPublicacion(publicacionData);
      await loadPublicaciones();
    } catch (err) {
      throw err;
    }
  };

  const handleUpdatePublicacion = async (id, publicacionData) => {
    try {
      await updatePublicacion(id, publicacionData);
      await loadPublicaciones();
    } catch (err) {
      throw err;
    }
  };

  const handleDeletePublicacion = async (id) => {
    try {
      await deletePublicacion(id);
      await loadPublicaciones(); 
    } catch (err) {
      throw err;
    }
  };

  return {
    publicaciones,
    loading,
    error,
    handleAddPublicacion,
    handleUpdatePublicacion,
    handleDeletePublicacion
  };
};