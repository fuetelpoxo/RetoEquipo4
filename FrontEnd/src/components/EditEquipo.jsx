import React, { useState } from 'react';

const EditEquipo = ({ equipo, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    nombre: equipo?.nombre || '',
    grupo: equipo?.grupo || '',
    centro_id: equipo?.centro_id || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!form.grupo.trim()) {
      newErrors.grupo = 'El grupo es requerido';
    }
    if (!form.centro_id) {
      newErrors.centro_id = 'El centro es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const dataToSubmit = {
        nombre: form.nombre,
        grupo: form.grupo,
        centro_id: parseInt(form.centro_id)
      };
      await onSubmit(dataToSubmit);
      onCancel();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="container mt-3">
      <h2>{equipo ? "Editar Equipo" : "Añadir Equipo"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Equipo</label>
          <input
            type="text"
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Grupo</label>
          <input
            type="text"
            className={`form-control ${errors.grupo ? 'is-invalid' : ''}`}
            name="grupo"
            value={form.grupo}
            onChange={handleChange}
            maxLength="1"
          />
          {errors.grupo && <div className="invalid-feedback">{errors.grupo}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Centro</label>
          <input
            type="number"
            className={`form-control ${errors.centro_id ? 'is-invalid' : ''}`}
            name="centro_id"
            value={form.centro_id}
            onChange={handleChange}
          />
          {errors.centro_id && <div className="invalid-feedback">{errors.centro_id}</div>}
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditEquipo;