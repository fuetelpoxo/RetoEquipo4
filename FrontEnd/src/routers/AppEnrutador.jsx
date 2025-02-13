import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from '../layouts/AppLayout.jsx';
import LoginLayout from "../components/LoginLayout.jsx";
import LogIn from '../pages/Publicas/LogIn.jsx';
import Inicio from '../pages/Publicas/Inicio.jsx';
import Torneo from '../pages/Publicas/Torneo.jsx';
import RetosInfo from '../pages/Publicas/RetosInfo.jsx';
import Reglamento from '../pages/Publicas/Reglamento.jsx';
import InfoEquipos from '../pages/Publicas/InfoEquipos.jsx';
import Inscripcion from '../pages/Publicas/Inscripcion.jsx';
import RetosPublic from '../pages/Publicas/RetosPublic.jsx';
import EquiposPublic from '../pages/Publicas/EquiposPublic.jsx';
import TorneoSolidario from '../pages/Publicas/TorneoSolidario.jsx';
import AdministradorInicio from '../pages/Administrador/AdminInicio.jsx';
import DirectorTorneo from '../pages/Director/DirectorTorneo.jsx';
import Entrenador from '../pages/Entrenador/Entrenador.jsx';
import Periodista from '../pages/Periodista/Periodista.jsx';
import { useAuth } from '../context/UserContext.jsx';
import Patrocinadores from '../pages/Publicas/Patrocinadores.jsx';
import Objetivos from '../pages/Publicas/Objetivos.jsx';
import Horarios from '../pages/Publicas/Horarios.jsx';
import FaseFinal from '../pages/Publicas/FaseFinal.jsx';
import Clasificacion from '../pages/Publicas/Clasificacion.jsx';

function AppEnrutador() {
    const { loggedInUser } = useAuth();

    const Configuracion = () => {
        if (!loggedInUser) {
            return <Navigate to="/login" />;
        }

        switch (loggedInUser.role) {
            case 'admin':
                return <Navigate to="/administrador" />;
            case 'director':
                return <Navigate to="/director" />;
            case 'entrenador':
                return <Navigate to="/entrenador" />;
            case 'periodista':
                return <Navigate to="/periodista" />;
            default:
                return <Navigate to="/" />;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas con layout y menú */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={< Inicio />} />
                    <Route path="login" element={< LogIn />} />
                    <Route path="torneo" element={< Torneo />} />
                    <Route path="retos" element={< RetosPublic />} />
                    <Route path="retos/inforetos" element={< RetosInfo />} />
                    <Route path="solidario" element={< TorneoSolidario />} />
                    <Route path="solidario/patrocinadores" element={< Patrocinadores />} />
                    <Route path="solidario/objetivos" element={< Objetivos />} />
                    <Route path="equipos" element={< EquiposPublic />} />
                    <Route path="equipos/infoequipos" element={< InfoEquipos />} />
                    <Route path="equipos/inscripcion" element={< Inscripcion />} />
                    <Route path="torneo/horario" element={< Horarios />} />
                    <Route path="torneo/fase-final" element={< FaseFinal />} />
                    <Route path="torneo/reglamento" element={< Reglamento />} />
                    <Route path="torneo/clasificacion" element={< Clasificacion />} />
                </Route>

                {/* Ruta de login sin menú */}
                <Route path="/login" element={<LoginLayout />}>
                    <Route index element={<LogIn />} />
                </Route>

                {/* Rutas privadas por rol */}
                <Route path="/administrador" element={<AdministradorInicio />} />
                <Route path="/director" element={<DirectorTorneo />} />
                <Route path="/entrenador" element={<Entrenador />} />
                <Route path="/periodista" element={<Periodista />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppEnrutador;
