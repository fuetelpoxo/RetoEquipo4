import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function FaseFinal() {
    return (
        <div className="container mt-4 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <div className="d-flex flex-column align-items-center position-relative">
                    <div className="border p-3 text-center position-relative" style={{ minWidth: "250px", fontSize: "1.2rem", marginBottom: "10px" }}>Semifinalista 1</div>
                    <div className="border p-3 text-center position-relative" style={{ minWidth: "250px", fontSize: "1.2rem", marginBottom: "22px" }}>Semifinalista 2</div>
                    <div className="border p-3 text-center position-relative" style={{ minWidth: "250px", fontSize: "1.2rem", marginBottom: "10px" }}>Semifinalista 3</div>
                    <div className="border p-3 text-center position-relative" style={{ minWidth: "250px", fontSize: "1.2rem" }}>Semifinalista 1+4</div>
                </div>
                <div className="d-flex flex-column align-items-center position-relative ms-5">
                    <div className="border p-3 text-center position-relative" style={{ minWidth: "250px", fontSize: "1.2rem", marginBottom: "90px" }}>Finalista 1</div>
                    <div className="border p-3 text-center position-relative" style={{ minWidth: "250px", fontSize: "1.2rem" }}>Finalista 2</div>
                </div>
            </div>
            
            {/* Sección del equipo ganador */}
            <div className="mt-4 d-flex flex-column align-items-center">
                <div className="card" style={{ maxWidth: "400px" }}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/8/86/Sevilla_CF_logo.svg" className="card-img-top p-3" alt="Sevilla FC" />
                    <div className="card-body text-center">
                        <h5 className="card-title">Finalista 1 - Campeón</h5>
                        <p className="card-text">Resultado Final: Finalista 1 2 - 1 Finalista 2</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FaseFinal;
