// Datos estáticos de ONG
const ONG_DATA = {
  data: {
    id: 1,
    nombre: 'Cruz Roja',
    url: 'https://www2.cruzroja.es/'
  }
};

export const getDonaciones = async () => {
  try {
    const response = await fetch("/api/donaciones");
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    
    // Transformar los datos para incluir la información de la ONG
    const donacionesFormateadas = data.data.map(donacion => ({
      ...donacion,
      nombreOng: donacion.ong?.nombre || 'ONG no encontrada',
      importe: parseFloat(donacion.importe),
      kilos: parseFloat(donacion.kilos),
      fechaActualizacion: new Date(donacion.fechaActualizacion).toLocaleString()
    }));
    
    return donacionesFormateadas;
  } catch (err) {
    throw new Error("Error al obtener las donaciones: " + err.message);
  }
};

export const updateDonacion = async (donacionId, donacionData) => {
  try {
    const response = await fetch(`/api/donaciones/${donacionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...donacionData,
        kilos: parseFloat(donacionData.kilos),
        importe: parseFloat(donacionData.importe)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar la donación');
    }

    const data = await response.json();
    return {
      ...data.data,
      nombreOng: data.data.ong?.nombre || 'ONG no encontrada',
      importe: parseFloat(data.data.importe),
      kilos: parseFloat(data.data.kilos),
      fechaActualizacion: new Date(data.data.fechaActualizacion).toLocaleString()
    };
  } catch (err) {
    throw new Error(`Error al actualizar la donación: ${err.message}`);
  }
};