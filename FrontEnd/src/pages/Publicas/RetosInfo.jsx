import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function RetosInfo() {
    const location = useLocation();
    const { retoInfo } = location.state || {};
    const fotoUrl = `/api/imagenes/${retoInfo?.retos_id}`;

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
            <div className="card">
                <img src={fotoUrl} className="card-img-top" alt={retoInfo.titulo} style={{ maxHeight: "400px", objectFit: "cover" }} />
                <div className="card-body">
                    <h1 className="card-title">{retoInfo.titulo}</h1>
                    {/* Add more reto details here */}
                </div>
            </div>
        </div>
    );
}

export default RetosInfo;
