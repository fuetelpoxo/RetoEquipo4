import React from 'react';
import furbo from '/furbo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext'; // Asegúrate de tener el contexto de usuario

function Inicio() {
    const { loggedInUser } = useAuth(); // Obtienes el usuario logueado
    const navigate = useNavigate();

    // Comprobamos si el usuario es entrenador
    const isEntrenador = loggedInUser?.role === 'entrenador';

    function handleInscripcionClick() {
        if (!isEntrenador) {
            navigate('/login'); // Redirige a login si no eres entrenador
        }
    };

    return (
        <>
            {/* Carrusel */}
            <div className='position-relative overflow-hidden rounded-2' style={{ height: '30vh', margin: '1%', marginTop: '90px' }}>
                <div
                    id='carouselExampleAutoplaying'
                    className='carousel slide position-absolute top-0 start-0 w-100'
                    data-bs-ride='carousel'
                    style={{ height: '100%' }}
                >
                    <div className='carousel-inner h-100'>
                        {/* Primer item del carrusel */}
                        <div className='carousel-item active h-100' style={{ backgroundImage: `url(${furbo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className='position-absolute top-50 start-50 translate-middle text-center text-light w-100 d-flex justify-content-center align-items-center'>
                                <h1 className='fw-bold fs-3 text-shadow'>Titulo Torneo</h1>
                            </div>
                        </div>
                        {/* Segundo item del carrusel */}
                        <div className='carousel-item h-100' style={{ backgroundImage: `url(${furbo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className='position-absolute top-50 start-50 translate-middle text-center text-light w-100 d-flex justify-content-center align-items-center'>
                                <h1 className='fw-bold fs-3 text-shadow'>¿Quieres ayudar? <a href='#' className='text-reset text-decoration-none'>Haz click aqui.</a></h1>
                            </div>
                        </div>
                        {/* Tercer item del carrusel */}
                        <div className='carousel-item h-100' style={{ backgroundImage: `url(${furbo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className='position-absolute top-50 start-50 translate-middle text-center text-light w-100 d-flex justify-content-center align-items-center'>
                                <h1 className='fw-bold fs-3 text-shadow'>
                                    <Link to={isEntrenador ? "/equipos/inscripcion" : "login"} onClick={!isEntrenador ? handleInscripcionClick : undefined} className='text-reset text-decoration-none'>
                                        {isEntrenador ? 'Registra tu equipo aqui.' : 'Inicia sesión como entrenador para inscribir tu equipo.'}
                                    </Link>
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Boton Izquierda */}
                    <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleAutoplaying' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    {/* Boton Derecha */}
                    <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleAutoplaying' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div >

            {/* Presentación */}
            <div className='position-relative overflow-hidden d-flex justify-content-center align-items-center p-3'>
                <div className='p-3 rounded-3 text-center border shadow'
                    style={{ maxWidth: '90%' }}>
                    <p className='fs-3 text-break fw-medium m-0'>
                        Bienvenido al <span className='text-danger fw-bold'>Torneo Solidario de Fútbol</span>, un evento donde el deporte y la solidaridad se unen por una buena causa. Participa, compite y colabora para ayudar a quienes más lo necesitan. ¡Inscríbete y forma parte de esta iniciativa!
                    </p>
                </div>
            </div>

            {/* Organizadores y Patrocinadores Generales */}
            <div className='container text-center my-4'>
                <h2 className='text-danger fw-bold' style={{ margin: '5%' }}>Nuestros Patrocinadores</h2>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src='' alt='Patrocinador 1' className='sponsor-logo border border-danger rounded-3 p-2 bg-white' />
                    </div>
                    <div className='col-md-4'>
                        <img src='' alt='Patrocinador 2' className='sponsor-logo border border-danger rounded-3 p-2 bg-white' />
                    </div>
                    <div className='col-md-4'>
                        <img src='' alt='Patrocinador 3' className='sponsor-logo border border-danger rounded-3 p-2 bg-white' />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-4'>
                        <img src='' alt='Patrocinador 4' className='sponsor-logo border border-danger rounded-3 p-2 bg-white' />
                    </div>
                    <div className='col-md-4'>
                        <img src='' alt='Patrocinador 5' className='sponsor-logo border border-danger rounded-3 p-2 bg-white' />
                    </div>
                    <div className='col-md-4'>
                        <img src='' alt='Patrocinador 6' className='sponsor-logo border border-danger rounded-3 p-2 bg-white' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Inicio;
