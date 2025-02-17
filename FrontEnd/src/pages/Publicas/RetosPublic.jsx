import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function RetosPublic({ userRole }) {
    const navigate = useNavigate();
    const [ramasFP, setRamasFP] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://api.example.com/ramasFP")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                return response.json();
            })
            .then((data) => setRamasFP(data))
            .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    const renderCard = (rama) => (
        <div key={rama.id} className="col-md-4 mb-4">
            <div className="border h-100 d-flex flex-column">
                <h2 className="text-center text-danger mb-0 bg-dark text-white p-3">{rama.nombre}</h2>
                <div className="p-3 flex-grow-1 d-flex flex-column">
                    <p className="flex-grow-1">{rama.descripcion}</p>
                    <button className="btn btn-danger mt-auto w-100" onClick={() => navigate(`/retos/inforetos/${rama.nombre}`)}>
                        Ver más
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>        <div className="container mt-5" style={{ borderTop: "4px solid red", paddingTop: "20px" }}>
            <div className="row d-flex flex-wrap">
                {ramasFP.map((rama) => renderCard(rama))}
            </div>
        </div>
        </>
    );
}

export default RetosPublic;
