import React, { createContext, useState } from 'react';

const SeguridadContext = createContext();

function SeguridadProvider({ children }) {

    const [datos, setDatos] = useState({ usuario: "", tienePermisos: false });

    const logIn = async (nombre) => {
        let nuevosDatos = { ...datos, usuario: nombre, tienePermisos: true };
        setDatos(nuevosDatos);
    }

    const logOut = async () => {
        let nuevosDatos = { ...datos, usuario: "", tienePermisos: false };
        setDatos(nuevosDatos);
    }

    return (
        <SeguridadContext.Provider value={{ datos, logIn, logOut }}>
            {children}
        </SeguridadContext.Provider>
    );
}

export { SeguridadContext, SeguridadProvider };
