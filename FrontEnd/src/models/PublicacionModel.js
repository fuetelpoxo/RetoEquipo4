export const getPublicaciones = async () => {
  try {
    const response = await fetch("/api/publicaciones");
    if (!response.ok) throw new Error("Error al obtener las publicaciones");
    const data = await response.json();
    return data.data.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
  } catch (err) {
    throw new Error("Error al cargar las publicaciones: " + err.message);
  }
};

export const addPublicacion = async (publicacionData) => {
  try {
    const response = await fetch("/api/publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publicacionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear la publicación");
    }
    return await response.json();
  } catch (err) {
    throw new Error(`Error al crear la publicación: ${err.message}`);
  }
};

export const updatePublicacion = async (id, publicacionData) => {
  try {
    const response = await fetch(`/api/publicaciones/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publicacionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar la publicación");
    }
    return await response.json();
  } catch (err) {
    throw new Error(`Error al actualizar la publicación: ${err.message}`);
  }
};

export const deletePublicacion = async (id) => {
  try {
    const response = await fetch(`/api/publicaciones/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar la publicación");
    }
    return await response.json();
  } catch (err) {
    throw new Error(`Error al eliminar la publicación: ${err.message}`);
  }
};