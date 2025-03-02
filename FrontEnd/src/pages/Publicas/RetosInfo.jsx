import React from "react";
import { useLogicaRetos } from "../../components/LogicaRetos";

function RetosInfo() {
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

    if (!retos || retos.length === 0) {
        return (
            <div className="container text-center mt-5">
                <h2 className="text-danger">No hay retos disponibles</h2>
                <p>Inténtalo más tarde.</p>
            </div>
        );
    }

    // Suponiendo que tomamos el primer reto de la lista como referencia
    const reto = retos[0];

    return (
        <div className="container mt-5">
            <h1 className="text-center text-danger mb-4">{reto.titulo}</h1>
            <div className="d-flex justify-content-center">
                <img
                    src={`/api/imagenes/${reto.retos_id}`}
                    alt={reto.titulo}
                    className="img-fluid rounded shadow"
                    style={{ maxWidth: "80%", maxHeight: "400px", objectFit: "cover" }}
                />
            </div>
            <p className="mt-4">{reto.texto}</p>
        </div>
    );
}

export default RetosInfo;
