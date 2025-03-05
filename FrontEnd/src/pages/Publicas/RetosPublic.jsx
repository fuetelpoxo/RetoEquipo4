import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogicaRetos } from "../../core/LogicaRetos";

function RetosPublic() {
    const navigate = useNavigate();
    const { retos, error, loading } = useLogicaRetos();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    const handleVerMas = (reto) => {
        navigate('/retos/inforetos', { state: { retoInfo: reto } });
    };

    const renderCard = (reto) => {
        return (
            <div key={reto.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column p-4">
                        <h3 className="card-title text-center mb-4 fw-bold text-success">{reto.titulo}</h3>
                        <button 
                            className="btn btn-success w-100 mt-auto py-2 fw-semibold"
                            onClick={() => handleVerMas(reto)}
                        >
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="display-4 fw-bold text-success mb-4">Retos Disponibles</h2>
                <hr className="w-25 mx-auto" />
            </div>
            <div className="row justify-content-center g-4">
                {retos.map((reto) => renderCard(reto))}
            </div>
        </div>
    );
}

export default RetosPublic;
