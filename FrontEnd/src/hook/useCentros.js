import { useState } from 'react';

export const useCentros = () => {
    const [centros] = useState([
        { id: 1, nombre: 'IES Zapaton' },
        { id: 2, nombre: 'IES Miguel Herrero Pereda' },
        { id: 3, nombre: 'IES Besaya' }
    ]);
    const [loading] = useState(false);
    const [error] = useState(null);

    return { centros, loading, error };
};