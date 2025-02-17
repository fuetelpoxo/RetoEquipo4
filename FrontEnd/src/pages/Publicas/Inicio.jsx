import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';

function Inicio() {
    const { loggedInUser } = useAuth();
    const navigate = useNavigate();
    const [carouselImages, setCarouselImages] = useState([]);
    const [sponsorImages, setSponsorImages] = useState([]);
    const isEntrenador = loggedInUser?.role === 'entrenador';
    const canEditImages = ['periodista', 'administrador'].includes(loggedInUser?.role);

    useEffect(() => {
        // Cargar imágenes desde la API con fetch
        fetch('/api/images/carousel')
            .then(response => response.json())
            .then(data => setCarouselImages(data))
            .catch(error => console.error('Error cargando imágenes del carrusel:', error));

        fetch('/api/images/sponsors')
            .then(response => response.json())
            .then(data => setSponsorImages(data))
            .catch(error => console.error('Error cargando imágenes de patrocinadores:', error));
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

    return (
        <>
            {/* Carrusel */}
            <div className='position-relative overflow-hidden rounded-2' style={{ height: '30vh', margin: '1%', marginTop: '90px' }}>
                <div id='carouselExampleAutoplaying' className='carousel slide position-absolute top-0 start-0 w-100' data-bs-ride='carousel' style={{ height: '100%' }}>
                    <div className='carousel-inner h-100'>
                        {carouselImages.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} h-100`} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                {canEditImages && (
                                    <input type='file' className='position-absolute top-0 start-0' onChange={(e) => handleImageUpload(e, 'carousel', index)} />
                                )}
                            </div>
                        ))}
                    </div>
                    <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleAutoplaying' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    </button>
                    <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleAutoplaying' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    </button>
                </div>
            </div>

            {/* Patrocinadores */}
            <div className='container text-center my-4'>
                <h2 className='text-danger fw-bold' style={{ margin: '5%' }}>Nuestros Patrocinadores</h2>
                <div className='row'>
                    {sponsorImages.map((image, index) => (
                        <div key={index} className='col-md-4'>
                            <img src={image} alt={`Patrocinador ${index + 1}`} className='sponsor-logo border border-danger rounded-3 p-2 bg-white' />
                            {canEditImages && (
                                <input type='file' className='d-block mt-2' onChange={(e) => handleImageUpload(e, 'sponsors', index)} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Inicio;
