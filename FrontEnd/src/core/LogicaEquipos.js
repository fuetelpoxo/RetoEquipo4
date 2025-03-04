import { useState, useEffect } from 'react';
import { getEquipos, getJugadoresByEquipo } from '../models/EquipoModel';

export const useLogicaEquiposPublic = () => {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarEquipos = async () => {
            try {
                setLoading(true);
                const equiposData = await getEquipos();
                setEquipos(equiposData);
            } catch (err) {
                console.error('Error al cargar equipos:', err);
                setError('Error al cargar los equipos');
            } finally {
                setLoading(false);
            }
        };

        cargarEquipos();
    }, []);

    return {
        equipos,
        loading,
        error
    };
};

export const useLogicaInfoEquipo = (nombre) => {
    const [equipo, setEquipo] = useState(null);
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const equipos = await getEquipos();
                const nombreDecodificado = nombre.replace(/-/g, ' ').toLowerCase();
                const equipoEncontrado = equipos.find(
                    e => e.nombre.toLowerCase() === nombreDecodificado
                );

                if (equipoEncontrado) {
                    setEquipo(equipoEncontrado);
                    const jugadoresData = await getJugadoresByEquipo(equipoEncontrado.id);
                    setJugadores(jugadoresData);
                } else {
                    setError('Equipo no encontrado');
                }
            } catch (err) {
                setError('Error al cargar los datos del equipo');
            } finally {
                setLoading(false);
            }
        };

        if (nombre) {
            fetchData();
        }
    }, [nombre]);

    const getPersonalByTipo = () => {
        const entrenador = jugadores.find(j => j.tipo === 'entrenador');
        const capitan = jugadores.find(j => j.tipo === 'capitan');
        const jugadoresRegulares = jugadores.filter(j => j.tipo === 'jugador');

        return {
            entrenador,
            capitan,
            jugadoresRegulares
        };
    };

    return {
        equipo,
        loading,
        error,
        getPersonalByTipo
    };
};