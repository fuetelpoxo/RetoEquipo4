import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function RetosInfo({ userRole }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        fetch(`https://api.example.com/retos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setInfo(data);
                setFotos(data.fotos || []);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    if (!info) {
        return <div className="container mt-4 text-center">Cargando...</div>;
    }

    return (
        <>
            <div className="container mt-5" style={{ borderTop: "4px solid red", paddingTop: "20px" }}>
                <div className="border p-4">
                    <h1 className="text-center text-danger mb-3 bg-dark text-white p-3">{info.nombre}</h1>
                    <h3 className="text-center text-primary">{info.fpNombre}</h3>
                    <p className="text-center">{info.descripcion}</p>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title text-danger">Detalles del reto</h5>
                            <p className="card-text">{info.detalles}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h5 className="text-center text-danger">Fotos del reto</h5>
                        <div className="d-flex flex-wrap justify-content-center">
                            {fotos.map((foto, index) => (
                                <img key={index} src={foto} alt={`Reto ${index}`} className="m-2" style={{ width: "300px", height: "200px", objectFit: "cover" }} />
                            ))}
                        </div>
                    </div>
                    {(userRole === "periodista" || userRole === "admin") && (
                        <button className="btn btn-warning mt-4 w-100" onClick={() => navigate(`/editar-reto/${id}`)}>
                            Editar Reto
                        </button>
                    )}
                    {userRole === "periodista" && (
                        <button className="btn btn-danger mt-4 w-100" onClick={() => navigate("/crear-post")}>
                            Crear Post
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default RetosInfo;
