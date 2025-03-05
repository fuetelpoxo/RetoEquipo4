import { useState, useEffect } from 'react';
import { getDonaciones, updateDonacion } from '../models/DonacionModel';

export const useDonaciones = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDonaciones();
  }, []);

  const cargarDonaciones = async () => {
    try {
      setLoading(true);
      const data = await getDonaciones();
      setDonaciones(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDonacion = async (donacionId, donacionData) => {
    try {
      const updatedDonacion = await updateDonacion(donacionId, donacionData);
      
      // Actualizar el estado local con la donación actualizada
      setDonaciones(donaciones.map(donacion => 
        donacion.id === donacionId ? {
          ...updatedDonacion,
          nombreOng: donacion.nombreOng // Mantener el nombre de la ONG
        } : donacion
      ));
      
      return updatedDonacion;
    } catch (err) {
      setError(`Error al actualizar la donación: ${err.message}`);
      throw err;
    }
  };

  return {
    donaciones,
    loading,
    error,
    handleUpdateDonacion,
  };
};