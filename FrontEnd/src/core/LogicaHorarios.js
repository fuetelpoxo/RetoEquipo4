import { useState, useEffect } from 'react';

export function useLogicaHorarios() {
    const [partidos, setPartidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPartidos = async () => {
            try {
                const response = await fetch('/api/partidos');
                if (!response.ok) {
                    throw new Error('Error al cargar los partidos');
                }
                const data = await response.json();
                // Ordenar partidos por fecha
                const partidosOrdenados = (data.data || []).sort((a, b) => 
                    new Date(a.fecha) - new Date(b.fecha)
                );
                setPartidos(partidosOrdenados);
            } catch (error) {
                setError('Error al cargar los partidos: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPartidos();
    }, []);

    return { partidos, loading, error };
}