import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogicaRetos } from "../../core/LogicaRetos";

function RetosPublic() {
    const navigate = useNavigate();
    const { retos, error } = useLogicaRetos();

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
        const nombreUrl = reto.titulo.toLowerCase().replace(/ /g, '-');
        navigate(`/retos/${nombreUrl}`, { state: { retoInfo: reto } });
    };

    const renderCard = (reto) => {
        const fotoUrl = `/api/imagenes/${reto.retos_id}`;

        return (
            <div key={reto.retos_id} className="col-md-6 col-lg-4 mb-4">
                <div className="border h-100 d-flex flex-column" style={{ minHeight: "350px" }}>
                    <h2 className="text-center text-danger mb-0 bg-dark text-white p-3">{reto.titulo}</h2>
                    <img src={fotoUrl} alt={reto.titulo} className="img-fluid" style={{ maxHeight: "220px", objectFit: "cover" }} />
                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-end">
                        <button 
                            className="btn btn-danger mt-auto"
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
        <div className="container mt-5" style={{ borderTop: "4px solid red", paddingTop: "20px" }}>
            <div className="row d-flex flex-wrap">
                {retos.map((reto) => renderCard(reto))}
            </div>
        </div>
    );
}

export default RetosPublic;
