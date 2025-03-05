import React, { useState } from 'react';
import { validateUserForm } from '../core/validateForms';

const EditUser = ({ user, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    perfil: user?.perfil || '',
    activo: user?.activo ?? true
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { errors, isValid } = validateUserForm(form, user);
    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const dataToSubmit = {
        ...form,
        activo: Boolean(form.activo)
      };
      
      // Si el email no ha cambiado, lo eliminamos
      if (user && user.email === form.email) {
        delete dataToSubmit.email;
      }

      // Si no hay nueva contraseña, la eliminamos
      if (user && !form.password.trim()) {
        delete dataToSubmit.password;
      }

      await onSubmit(dataToSubmit);
      onCancel();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  return (
    <div>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Nombre"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="ejemplo@gmail.com"
            type="email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Contraseña (dejar en blanco para mantener la actual)
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            type="password"
            placeholder="Dejar en blanco para mantener la actual"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Perfil</label>
          <select
            name="perfil"
            value={form.perfil}
            onChange={handleChange}
            className={`form-control ${errors.perfil ? 'is-invalid' : ''}`}
          >
            <option value="">Seleccione un perfil</option>
            <option value="administrador">Administrador</option>
            <option value="entrenador">Entrenador</option>
            <option value="director">Director</option>
            <option value="periodista">Periodista</option>
          </select>
          {errors.perfil && <div className="invalid-feedback">{errors.perfil}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            name="activo"
            value={form.activo.toString()}
            onChange={handleChange}
            className="form-control"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditUser;