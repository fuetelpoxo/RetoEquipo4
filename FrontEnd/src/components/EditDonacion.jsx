import React, { useState } from 'react';

const EditDonacion = ({ donacion, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    ong_id: 1, // Siempre será 1 (Cruz Roja)
    kilos: donacion.kilos,
    importe: donacion.importe
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.kilos) newErrors.kilos = 'Los kilos son requeridos';
    if (!form.importe) newErrors.importe = 'El importe es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(form);
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  return (
    <div className="container mt-3">
      <h2>Editar Donación para {donacion.nombreOng}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Kilos</label>
          <input
            type="number"
            name="kilos"
            value={form.kilos}
            onChange={handleChange}
            className={`form-control ${errors.kilos ? 'is-invalid' : ''}`}
          />
          {errors.kilos && <div className="invalid-feedback">{errors.kilos}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Importe</label>
          <input
            type="number"
            step="0.01"
            name="importe"
            value={form.importe}
            onChange={handleChange}
            className={`form-control ${errors.importe ? 'is-invalid' : ''}`}
          />
          {errors.importe && <div className="invalid-feedback">{errors.importe}</div>}
        </div>

        <button type="submit" className="btn btn-primary me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditDonacion;