import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/UserContext'; // Importa el AuthProvider
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../css/reglamento.css'
import AppEnrutador from './routers/AppEnrutador.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Envuelve tu aplicación con AuthProvider */}
      <AppEnrutador />

    </AuthProvider>
  </StrictMode>,
);
