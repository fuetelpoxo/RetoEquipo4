export const getUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users");
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error("Error al obtener los usuarios: " + err.message);
    }
  };
  