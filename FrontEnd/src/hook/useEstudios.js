import { useState, useEffect } from 'react';
import { getEstudios } from '../models/EstudioModel';

export const useEstudios = () => {
  const [estudios, setEstudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEstudios = async () => {
    try {
      setLoading(true);
      const data = await getEstudios();
      setEstudios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudios();
  }, []);

  return { estudios, loading, error, fetchEstudios };
};