import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

export function useLogicaInicio() {
    const { loggedInUser } = useAuth();
    const navigate = useNavigate();
    const [carouselImages, setCarouselImages] = useState([]);
    const [sponsorImages, setSponsorImages] = useState([]);
    const isEntrenador = loggedInUser?.role === 'entrenador';
    const canEditImages = ['periodista', 'administrador'].includes(loggedInUser?.role);

    useEffect(() => {
        fetch('/api/imagenes')
            .then(response => response.json())
            .then(data => {
                const carousel = data.filter(img => img.publicacion_id).slice(0, 3);
                const sponsors = data.filter(img => img.patrocinador_id);
                setCarouselImages(carousel.map(img => img.url));
                setSponsorImages(sponsors.map(img => img.url));
            })
            .catch(error => console.error('Error cargando imágenes:', error));
    }, []);

    return {
        carouselImages,
        sponsorImages,
        canEditImages,
        handleInscripcionClick: () => {
            if (!isEntrenador) {
                navigate('/login');
            }
        }
    };
}