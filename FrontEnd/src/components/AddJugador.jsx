import React, { useState, useEffect } from 'react';
import { getEquiposSelect, uploadImagenJugador } from '../models/JugadorModel';
import { useEstudios } from '../hook/useEstudios';

const calcularLetraDNI = (numeros) => {
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const indice = parseInt(numeros) % 23;
  return letras.charAt(indice);
};

const AddJugador = ({ onSubmit, onCancel }) => {
  const { estudios, loading: loadingEstudios } = useEstudios();
  const [form, setForm] = useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    dni: '',
    tipo: '',
    equipo_id: '',
    estudio_id: '',
    email: '',
    telefono: ''
  });

  const [errors, setErrors] = useState({});
  const [equipos, setEquipos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Añadimos estado para errores

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        const equiposData = await getEquiposSelect();
        setEquipos(equiposData);
      } catch (error) {
        console.error('Error al cargar equipos:', error);
        setError('Error al cargar los equipos'); // Guardamos el error en el estado
      } finally {
        setIsLoading(false);
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (isLoading) return <div>Cargando datos...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>; // Usamos el estado error en lugar de loadError

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!form.apellido1.trim()) newErrors.apellido1 = 'El primer apellido es requerido';
    if (!form.dni.trim()) newErrors.dni = 'El DNI es requerido';
    if (!form.tipo) newErrors.tipo = 'El tipo es requerido';
    if (!form.email) newErrors.email = 'El email es requerido';
    if (!form.telefono) newErrors.telefono = 'El teléfono es requerido';
    if (!form.equipo_id) newErrors.equipo_id = 'El equipo es requerido';
    if (!form.estudio_id) newErrors.estudio_id = 'El estudio es requerido'; // Nueva validación
    
    // Validación mejorada del DNI
    const dniRegex = /^(\d{8})([TRWAGMYFPDXBNJZSQVHLCKE])$/i;
    if (!form.dni) {
      newErrors.dni = 'El DNI es requerido';
    } else {
      const match = form.dni.toUpperCase().match(dniRegex);
      if (!match) {
        newErrors.dni = 'El DNI debe tener 8 números seguidos de una letra válida';
      } else {
        const [, numeros, letra] = match;
        const letraCalculada = calcularLetraDNI(numeros);
        if (letra.toUpperCase() !== letraCalculada) {
          newErrors.dni = 'La letra del DNI no es válida para esos números';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Primero crear el jugador
      const jugadorCreado = await onSubmit(form);
      console.log('Jugador creado:', jugadorCreado); // Para debuggear

      // Si hay una imagen seleccionada, subirla
      if (selectedImage && jugadorCreado && jugadorCreado.id) {
        try {
          const nombreImagen = `foto_${form.nombre}_${form.apellido1}_${Date.now()}`;
          const resultadoImagen = await uploadImagenJugador(
            selectedImage,
            jugadorCreado.id,
            nombreImagen
          );
          console.log('Imagen subida:', resultadoImagen); // Para debuggear
        } catch (imageError) {
          console.error('Error al subir la imagen:', imageError);
          // Aquí podrías mostrar un mensaje al usuario
        }
      }
      onCancel();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mt-3">
      <h2>Añadir Jugador</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
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
          <label className="form-label">Primer Apellido</label>
          <input
            type="text"
            className={`form-control ${errors.apellido1 ? 'is-invalid' : ''}`}
            name="apellido1"
            value={form.apellido1}
            onChange={handleChange}
          />
          {errors.apellido1 && <div className="invalid-feedback">{errors.apellido1}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Segundo Apellido</label>
          <input
            type="text"
            className="form-control"
            name="apellido2"
            value={form.apellido2}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DNI</label>
          <input
            type="text"
            className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
            name="dni"
            value={form.dni}
            onChange={(e) => {
                const value = e.target.value.toUpperCase();
                handleChange({
                    target: {
                        name: 'dni',
                        value: value
                    }
                });
            }}
            maxLength={9}
            placeholder="12345678A"
          />
          {errors.dni && <div className="invalid-feedback">{errors.dni}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className={`form-select ${errors.tipo ? 'is-invalid' : ''}`}
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="">Seleccione tipo</option>
            <option value="capitan">Capitán</option>
            <option value="jugador">Jugador</option>
            <option value="entrenador">Entrenador</option>
          </select>
          {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Estudio</label>
          <select
            className={`form-select ${errors.estudio_id ? 'is-invalid' : ''}`}
            name="estudio_id"
            value={form.estudio_id}
            onChange={handleChange}
            disabled={loadingEstudios}
          >
            <option value="">Seleccione un estudio</option>
            {estudios.map(estudio => (
              <option key={estudio.id} value={estudio.id}>
                {estudio.nombre}
              </option>
            ))}
          </select>
          {errors.estudio_id && <div className="invalid-feedback">{errors.estudio_id}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Equipo</label>
          <select
            className={`form-select ${errors.equipo_id ? 'is-invalid' : ''}`}
            name="equipo_id"
            value={form.equipo_id}
            onChange={handleChange}
          >
            <option value="">Seleccione un equipo</option>
            {equipos.map(equipo => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </select>
          {errors.equipo_id && <div className="invalid-feedback">{errors.equipo_id}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Foto del Jugador</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Vista previa"
                className="img-thumbnail"
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">
            Guardar
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJugador;
