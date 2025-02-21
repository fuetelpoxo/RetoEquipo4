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
        // Cargar imágenes desde la API con fetch
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

    function handleInscripcionClick() {
        if (!isEntrenador) {
            navigate('/login');
        }
    }

    function handleImageUpload(event, type, index) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', type);
            formData.append('index', index);

            fetch('/api/images/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (type === 'carousel') {
                        const updatedImages = [...carouselImages];
                        updatedImages[index] = data.url;
                        setCarouselImages(updatedImages);
                    } else {
                        const updatedSponsors = [...sponsorImages];
                        updatedSponsors[index] = data.url;
                        setSponsorImages(updatedSponsors);
                    }
                })
                .catch(error => console.error('Error subiendo imagen:', error));
        }
    }

    return {
        carouselImages,
        sponsorImages,
        canEditImages,
        handleInscripcionClick,
        handleImageUpload
    };
}