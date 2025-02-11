import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from '../components/AppLayout.jsx';
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

function AppEnrutador() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={< Inicio />} />
                    <Route path="login" element={< LogIn />} />
                    <Route path="torneo" element={< Torneo />} />
                    <Route path="retos" element={< RetosPublic />} />
                    <Route path="inforetos" element={< RetosInfo />} />
                    <Route path="equipos" element={< EquiposPublic />} />
                    <Route path="reglamento" element={< Reglamento />} />
                    <Route path="infoequipos" element={< InfoEquipos />} />
                    <Route path="inscripcion" element={< Inscripcion />} />
                    <Route path="torneosolidario" element={< TorneoSolidario />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default AppEnrutador;
