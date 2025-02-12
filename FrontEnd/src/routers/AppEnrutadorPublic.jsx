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
import { useAuth } from '../context/UserContext';

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
                    <Route index element={<Inicio />} />
                    <Route path="torneo" element={<Torneo />} />
                    <Route path="retos" element={<RetosPublic />} />
                    <Route path="inforetos" element={<RetosInfo />} />
                    <Route path="equipos" element={<EquiposPublic />} />
                    <Route path="reglamento" element={<Reglamento />} />
                    <Route path="infoequipos" element={<InfoEquipos />} />
                    <Route path="inscripcion" element={<Inscripcion />} />
                    <Route path="torneosolidario" element={<TorneoSolidario />} />
                    <Route path="configuracion" element={<Configuracion />} />
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
