import React from 'react';
import Colaborador1 from '/public/Colaboradores/Colaborador1.png';
import Colaborador2 from '/public/Colaboradores/Colaborador2.png';
import Colaborador3 from '/public/Colaboradores/Colaborador3.png';

function AppFooter() {
    return (
        <footer className="d-flex justify-content-evenly align-items-start p-5 bg-dark text-white">
            {/* Div de Contactanos */}
            <div className="text-center" style={{ flex: '1', maxWidth: '300px' }}>
                <h3>Contáctanos</h3>
                <div className="border-bottom border-danger w-75 mx-auto" style={{ height: '5px', marginBottom: '20px' }}></div>
                <p className="d-flex align-items-center gap-3">
                    <i className="fa fa-map-marker"></i>
                    <a href="https://www.google.com/maps/place/IES+Miguel+Herrero+Pereda/@43.3517158,-4.0626463,19z/data=!4m6!3m5!1s0xd493e18f1f29733:0x1420ebdf20460746!8m2!3d43.3524437!4d-4.0625016!16s%2Fg%2F119v3lm7j?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-decoration-none"
                    >
                        Dirección
                    </a>
                </p>
                <p className="d-flex align-items-center gap-3">
                    <i className="fa fa-envelope"></i>
                    <a href="mailto:ies.miguel.herrero.pereda@educantabria.es" className="text-white text-decoration-none">
                        Email
                    </a>
                </p>
            </div>

            {/* Div de Sobre Nosotros */}
            <div className="text-center mx-5" style={{ flex: '1', maxWidth: '300px' }}>
                <h3>Sobre Nosotros</h3>
                <div className="border-bottom border-danger w-75 mx-auto" style={{ height: '5px', marginBottom: '20px' }}></div>
                <p className="d-flex align-items-center gap-3">
                    <i className="fa fa-instagram"></i>
                    <a href="https://www.instagram.com/iesmiguelherreroligasolidaria/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-decoration-none"
                    >
                        Instagram
                    </a>
                </p>
                <p className="d-flex align-items-center gap-3">
                    <i className="fa fa-phone"></i>
                    Teléfono: +34 942 88 24 98
                </p>
            </div>

            {/* Div de Colaboradores */}
            <div className="text-center" style={{ flex: '1', maxWidth: '300px' }}>
                <h3>Colaboradores</h3>
                <div className="border-bottom border-danger w-75 mx-auto" style={{ height: '5px', marginBottom: '20px' }}></div>
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <img src={Colaborador1} alt="Logo 1" style={{ width: '100px', height: 'auto' }} />
                    <img src={Colaborador2} alt="Logo 2" style={{ width: '100px', height: 'auto' }} />
                    <img src={Colaborador3} alt="Logo 3" style={{ width: '100px', height: 'auto' }} />
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;
