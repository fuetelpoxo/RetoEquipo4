import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useEquipos } from '../hook/UseEquipos';

const EditPublicacion = ({ publicacion, onSubmit, onCancel }) => {
  const editorRef = useRef(null);
  const { equipos } = useEquipos();
  const [form, setForm] = useState({
    titulo: '',
    texto: '',
    portada: false,
    equipo_id: ''
  });

  useEffect(() => {
    if (publicacion) {
      setForm({
        titulo: publicacion.titulo || '',
        texto: publicacion.texto || '',
        portada: publicacion.portada || false,
        equipo_id: publicacion.equipo_id || ''
      });
    }
  }, [publicacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);
      onCancel();
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Editar Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={form.titulo}
            onChange={(e) => setForm(prev => ({...prev, titulo: e.target.value}))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Equipo</label>
          <select
            className="form-control"
            value={form.equipo_id}
            onChange={(e) => setForm(prev => ({...prev, equipo_id: e.target.value}))}
          >
            <option value="">Selecciona un equipo</option>
            {equipos?.map(equipo => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Contenido</label>
          <Editor
            apiKey='qsrsf87el1wj6htedc22mm2balej4hle6msa0bmrk74qucka'
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            value={form.texto}
            onEditorChange={(content) => setForm(prev => ({...prev, texto: content}))}
          />
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">Actualizar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPublicacion;