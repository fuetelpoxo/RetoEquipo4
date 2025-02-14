import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function InfoEquipos() {
    const { nombre } = useParams();
    const [equipo, setEquipo] = useState(null);

    useEffect(() => {
        // Asegúrate de que tu API permita la búsqueda por nombre
        fetch(`https://tuapi.com/equipos?nombre=${encodeURIComponent(nombre)}`)
            .then(response => response.json())
            .then(data => setEquipo(data[0])) // Suponemos que la API devuelve un array
            .catch(error => console.error('Error fetching equipo:', error));
    }, [nombre]);

    if (!equipo) {
        return (
            <div className="container mt-5">
                <div className="alert alert-info text-center" role="alert">
                    Cargando información del equipo...
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-4" style={{ borderTop: '4px solid red' }}>
            <div className="card shadow-lg">
                <div className="card-body">
                    <h1 className="card-title text-center text-danger">{equipo.nombre}</h1>
                    <div className="text-center">
                        <img src={equipo.foto} alt={equipo.nombre} className="img-fluid mb-3" style={{ maxWidth: '300px' }} />
                    </div>
                    <p className="card-text text-center">{equipo.descripcion}</p>
                    <p className="card-text text-center"><strong>Origen:</strong> {equipo.origen}</p>
                </div>
            </div>
        </div>
    );
}

export default InfoEquipos;
