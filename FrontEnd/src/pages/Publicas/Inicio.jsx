import React from 'react';
import { useLogicaInicio } from '../../core/LogicaInicio';

function Inicio() {
    const {
        carouselImages,
        sponsorImages,
        canEditImages,
        handleInscripcionClick,
        handleImageUpload
    } = useLogicaInicio();

    return (
        <>
            {/* Carrusel */}
            <div className='position-relative overflow-hidden' style={{ height: '30vh', marginTop: '70px', marginBottom: '30px' }}>
                <div id='carouselExampleFade' className='carousel slide carousel-fade h-100' data-bs-ride='carousel' data-bs-interval="5000">
                    <div className='carousel-inner h-100'>
                        {/* Primer slide - Cruz Roja */}
                        <div className='carousel-item active h-100'>
                            <div className='d-flex align-items-center justify-content-center h-100 rounded-4' style={{ backgroundColor: '#f8f9fa' }}>
                                <div className='text-center'>
                                    <h2 className='text-danger mb-2 fs-3 fw-bold'>¿Quieres Ayudar?</h2>
                                    <a href="https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='btn btn-danger px-3 py-2'>
                                        Entra Aquí
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Segundo slide - Nombre de la web */}
                        <div className='carousel-item h-100'>
                            <div className='d-flex align-items-center justify-content-center h-100 rounded-4' style={{ backgroundColor: '#f8f9fa' }}>
                                <div className='text-center'>
                                    <h2 className='text-danger mb-3 display-6 fw-bold'>Liga Solidaria</h2>
                                    <p className='text-secondary fs-5 fw-light'>Formación Profesional</p>
                                </div>
                            </div>
                        </div>

                        {/* Tercer slide - Vacío (placeholder) */}
                        <div className='carousel-item h-100'>
                            <div className='d-flex align-items-center justify-content-center h-100 rounded-4' style={{ backgroundColor: '#f8f9fa' }}>
                                <div className='text-center'>
                                    <h2 className='text-danger mb-3 display-6 fw-bold'>Contenido Próximamente</h2>
                                    <p className='text-secondary fs-5 fw-light'>Mantente atento a las novedades</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controles del carrusel */}
                    <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleFade' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleFade' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Patrocinadores */}
            <div className='container text-center'>
                <h2 className='text-danger fw-bold mb-4'>Nuestros Patrocinadores</h2>
                <div className='row'>
                    {sponsorImages.map((image, index) => (
                        <div key={index} className='col-md-4'>
                            <img src={image} alt={`Patrocinador ${index + 1}`} className='sponsor-logo border border-danger rounded-3 p-2 bg-white' />
                            {canEditImages && (
                                <input type='file' className='d-block mt-2' onChange={(e) => handleImageUpload(e, 'sponsors', index)} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Inicio;