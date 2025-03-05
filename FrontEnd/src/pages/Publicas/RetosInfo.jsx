import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RetosInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const { retoInfo } = location.state || {};

    if (!retoInfo) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    Información del reto no encontrada
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <h1 className="card-title text-success mb-4">{retoInfo.titulo}</h1>

                    {retoInfo.texto && (
                        <div className="mb-4">
                            <h4 className="text-success mb-3">Detalles adicionales:</h4>
                            <p>{retoInfo.texto}</p>
                        </div>
                    )}

                    {retoInfo.estudio && (
                        <div className="mb-4">
                            <h4 className="text-success mb-3">Información del Estudio:</h4>
                            <p><strong>Nombre del estudio:</strong> {retoInfo.estudio.nombre}</p>
                        </div>
                    )}

                    {retoInfo.imagenes && retoInfo.imagenes.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-success mb-3">Imágenes del Reto:</h4>
                            <div className="row g-3">
                                {retoInfo.imagenes.map((imagen, index) => (
                                    <div key={index} className="col-md-4">
                                        <img 
                                            src={imagen.url} 
                                            alt={`Imagen ${index + 1} del reto`}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {retoInfo.publicaciones && retoInfo.publicaciones.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-success mb-3">Publicaciones relacionadas:</h4>
                            <div className="list-group">
                                {retoInfo.publicaciones.map((publicacion, index) => (
                                    <div key={index} className="list-group-item">
                                        <h5>{publicacion.titulo}</h5>
                                        <p>{publicacion.contenido}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button 
                        className="btn btn-success mt-3"
                        onClick={() => navigate('/retos')}
                    >
                        Volver a Retos
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RetosInfo;
