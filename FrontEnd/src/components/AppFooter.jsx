import React from 'react';
import { FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; // Asegúrate de tener instalada la librería react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener importado Bootstrap

function AppFooter() {
    return (
        <footer className="d-flex justify-content-between p-4 bg-dark text-white">
            {/* Div de Contactanos */}
            <div className="text-center" style={{ marginLeft: '60px', marginRight: '60px' }}>
                <h3>Contáctanos</h3>
                <div className="border-bottom border-danger w-75 mx-auto" style={{ height: '5px', marginBottom: '10px' }}></div>
                <p className="d-flex align-items-center gap-3">
                    <FaMapMarkerAlt />
                    <a href="https://www.google.com/maps/place/IES+Miguel+Herrero+Pereda/@43.3517158,-4.0626463,19z/data=!4m6!3m5!1s0xd493e18f1f29733:0x1420ebdf20460746!8m2!3d43.3524437!4d-4.0625016!16s%2Fg%2F119v3lm7j?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-decoration-none"
                    >
                        Dirección
                    </a>
                </p>
                <p className="d-flex align-items-center gap-3">
                    <FaEnvelope />
                    <a href="mailto:ies.miguel.herrero.pereda@educantabria.es" className="text-white text-decoration-none">
                        Email
                    </a>
                </p>
            </div>

            {/* Div de Sobre Nosotros */}
            <div className="text-center" style={{ marginLeft: '60px', marginRight: '60px' }}>
                <h3>Sobre Nosotros</h3>
                <div className="border-bottom border-danger w-50 mx-auto" style={{ height: '5px', marginBottom: '10px' }}></div>
                <p className="d-flex align-items-center gap-3">
                    <FaInstagram />
                    <a href="https://www.instagram.com/reto_solidario_ies/?igsh=eHk4NzAzaTltaWt1#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-decoration-none"
                    >
                        Instagram
                    </a>
                </p>
                <p className="d-flex align-items-center gap-3">
                    <FaPhoneAlt />
                    Teléfono: +34 942 88 24 98
                </p>
            </div>

            {/* Div de Colaboradores */}
            <div className="text-center" style={{ marginLeft: '60px', marginRight: '60px' }}>
                <h3>Colaboradores</h3>
                <div className="border-bottom border-danger w-75 mx-auto" style={{ height: '5px', marginBottom: '10px' }}></div>
                <div className="d-flex justify-content-center gap-4">
                    <img src="logo1.png" alt="Logo 1" className="w-50" />
                    <img src="logo2.png" alt="Logo 2" className="w-50" />
                    <img src="logo3.png" alt="Logo 3" className="w-50" />
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;
