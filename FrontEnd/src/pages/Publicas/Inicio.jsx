import React from 'react';
import furbo from '/furbo.jpg';

function Inicio() {
    return (
        <>
            {/* Contenedor principal */}
            <div className="position-relative vh-100 overflow-hidden">
                {/* Carrusel como fondo */}
                <div
                    id="carouselExampleAutoplaying"
                    className="carousel slide position-absolute top-0 start-0 w-100"
                    data-bs-ride="carousel"
                    style={{ height: '40%' }}
                >
                    <div className="carousel-inner h-100">
                        {/* Primer item del carrusel */}
                        <div className="carousel-item active h-100" style={{ backgroundImage: `url(${furbo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="position-absolute top-50 start-50 translate-middle text-center text-dark w-100 d-flex justify-content-center align-items-center">
                                <h1 className="fw-bold fs-2">Titulo Torneo</h1>
                            </div>
                        </div>
                        {/* Segundo item del carrusel */}
                        <div className="carousel-item h-100" style={{ backgroundImage: `url(${furbo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="position-absolute top-50 start-50 translate-middle text-center text-dark w-100 d-flex justify-content-center align-items-center">
                                <h1 className="fw-bold fs-2">Titulo Torneo 2</h1>
                            </div>
                        </div>
                        {/* Tercer item del carrusel */}
                        <div className="carousel-item h-100" style={{ backgroundImage: `url(${furbo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="position-absolute top-50 start-50 translate-middle text-center text-dark w-100 d-flex justify-content-center align-items-center">
                                <h1 className="fw-bold fs-2">Titulo Torneo 3</h1>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div >
        </>
    );
}

export default Inicio;
