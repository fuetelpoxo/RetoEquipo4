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
    
    // Simular obtención de datos de ONG
    const donacionesConOng = data.data.map(donacion => ({
      ...donacion,
      nombreOng: ONG_DATA.data.nombre
    }));
    
    /* Código original comentado
    const donacionesConOng = await Promise.all(
      data.data.map(async (donacion) => {
        const ongResponse = await fetch(`/api/ongs/${donacion.ong_id}`);
        const ongData = await ongResponse.json();
        return {
          ...donacion,
          nombreOng: ongData.data.nombre
        };
      })
    );
    */
    
    return donacionesConOng;
  } catch (err) {
    throw new Error("Error al obtener las donaciones: " + err.message);
  }
};

export const updateDonacion = async (donacionId, donacionData) => {
  try {
    // Asegurarnos que siempre se envía el ong_id
    const dataToSend = {
      ...donacionData,
      ong_id: 1 // Siempre será 1 (Cruz Roja)
    };

    const response = await fetch(`/api/donaciones/${donacionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar la donación');
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    throw new Error(`Error al actualizar la donación: ${err.message}`);
  }
};