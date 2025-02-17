import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext'; // Asegúrate de que tengas el contexto de autenticación

function InfoEquipos() {
    const { nombre } = useParams();
    const [equipo, setEquipo] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // Hook para navegación
    const { loggedInUser } = useAuth(); // Obtener el usuario logueado desde el contexto

    const isEntrenador = loggedInUser?.role === 'entrenador'; // Verificar si el usuario es entrenador

    useEffect(() => {
        // Asegúrate de que tu API permita la búsqueda por nombre
        fetch(`https://tuapi.com/equipos?nombre=${encodeURIComponent(nombre)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setEquipo(data[0]); // Suponemos que la API devuelve un array
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }, [nombre]);

    const handleInscribirse = () => {
        if (!isEntrenador) {
            alert('Debes ser un entrenador para inscribir un equipo. Serás redirigido al login.');
            navigate('/login'); // Redirige a login si no eres entrenador
        } else {
            navigate('/equipos/inscripcion'); // Redirige a la vista de inscripción si eres entrenador
        }
    };

    if (error) {

        return (
            <div className="container mt-5">
                <div className="alert alert-info text-center" role="alert" style={{ marginTop: '60px' }}>
                    Da error por la API
                </div>
            </div>
        );
    }

    if (!equipo) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center" role="alert" style={{ marginTop: '60px' }}>
                    No se encontraron equipos.
                </div>
                {/* Botón para inscribirse */}
                <div className="text-center mt-4">
                    <h3 className="text-center text-danger">¿Quieres inscribir tu equipo?</h3>
                    <button className="btn btn-danger" onClick={handleInscribirse}>Inscribirse</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mt-5 pt-4" style={{ marginTop: '60px' }}>
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h1 className="card-title text-center bg-dark text-white p-3">{equipo.nombre}</h1>
                        <div className="text-center">
                            <img src={equipo.foto} alt={equipo.nombre} className="img-fluid mb-3" style={{ maxWidth: '300px' }} />
                        </div>
                        <p className="card-text text-center">{equipo.descripcion}</p>
                        <p className="card-text text-center"><strong>Origen:</strong> {equipo.origen}</p>

                        {/* Título condicional */}
                        <h2 className="text-center mt-4">{isEntrenador ? "¿Eres entrenador?" : "Inicia sesión para inscribirte"}</h2>

                        {/* Botón para inscribirse */}
                        <div className="text-center mt-4">
                            <h3 className="text-center text-danger">¿Quieres inscribir tu equipo?</h3>
                            <button className="btn btn-danger" onClick={handleInscribirse}>Inscribirse</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoEquipos;
