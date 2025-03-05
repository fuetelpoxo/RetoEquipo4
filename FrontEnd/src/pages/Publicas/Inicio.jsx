import React from 'react';
import { useLogicaInicio } from '../../core/LogicaInicio';
import LogoFederacionCantabraFutbol from '/public/Imagenes/LogosColaboradores/logoFederacionCantabraFutbol.png';
import Logo__Besaya from '/public/Imagenes/LogosColaboradores/Logo__Besaya.png';
import Logo_liga_solidaria_fp_cantabria from '/public/Imagenes/LogosColaboradores/Logo_liga_solidaria_fp_cantabria.png';
import LOGO_SEDE_TORRELAVEGA_1 from '/public/Imagenes/LogosColaboradores/LOGO_SEDE_TORRELAVEGA_1.png';
import logo_zapaton from '/public/Imagenes/LogosColaboradores/logo_zapaton.jpg';
import logoIESMHP from '/public/Imagenes/LogosColaboradores/logoIESMHP.png';

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
                                    <h2 className='text-danger mb-3 display-6 fw-bold'>Goles que Ayudan</h2>
                                </div>
                            </div>
                        </div>

                        {/* Tercer slide - Inscripción */}
                        <div className='carousel-item h-100'>
                            <div className='d-flex align-items-center justify-content-center h-100 rounded-4' style={{ backgroundColor: '#f8f9fa' }}>
                                <div className='text-center'>
                                    <h2 className='text-danger mb-3 display-6 fw-bold'>¿Quieres inscribirte?</h2>
                                    <button onClick={handleInscripcionClick} className='btn btn-danger px-3 py-2' >
                                        Pulsa aquí
                                    </button>
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
                    <div className="row g-3 p-4">
                        <div className="col-md-4">
                            <img src={LogoFederacionCantabraFutbol} alt="Patrocinador 1" className="w-100 rounded" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <div className="col-md-4">
                            <img src={Logo__Besaya} alt="Patrocinador 2" className="w-100 rounded" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <div className="col-md-4">
                            <img src={logo_zapaton} alt="Patrocinador 3" className="w-100 rounded" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <div className="col-md-4">
                            <img src={logoIESMHP} alt="Patrocinador 4" className="w-100 rounded" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <div className="col-md-4">
                            <img src={Logo_liga_solidaria_fp_cantabria} alt="Patrocinador 5" className="w-100 rounded" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <div className="col-md-4">
                            <img src={LOGO_SEDE_TORRELAVEGA_1} alt="Patrocinador 6" className="w-100 rounded" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Inicio;