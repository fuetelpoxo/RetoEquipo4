export const getEstudios = async () => {
  try {
    const response = await fetch('/api/estudios');
    if (!response.ok) throw new Error('Error al cargar estudios');
    
    const data = await response.json();
    return data.data.map(estudio => ({
      id: estudio.id,
      nombre: `${estudio.ciclo.nombre} ${estudio.curso}º - ${estudio.centro.nombre}`,
      centro_id: estudio.centro_id,
      ciclo_id: estudio.ciclo_id,
      curso: estudio.curso
    }));
  } catch (error) {
    console.error('Error al obtener estudios:', error);
    throw error;
  }
};