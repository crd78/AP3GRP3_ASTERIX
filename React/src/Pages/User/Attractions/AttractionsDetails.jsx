import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AttractionsDetails.css';


const AttractionDetails = () => {
    const { id_attraction } = useParams(); // Récupération de l'ID de l'URL avec useParams
    const [attraction, setAttraction] = useState(null);

    useEffect(() => {
        const fetchAttractionDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/attractions/${id_attraction}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAttraction(data);
                } else {
                    console.error('Erreur lors de la récupération des détails de l\'attraction:', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de l\'attraction:', error);
            }
        };

        fetchAttractionDetails();
    }, [id_attraction]);

    if (!attraction) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Détails de l'attraction : {attraction.nom}</h1>
            <img src={attraction.image} alt={`Image de ${attraction.nom}`} className="attraction-image-details" />
            <p>Numéro de l'attraction : {attraction.numero}</p>
            <p>Description : {attraction.description}</p>
            <p>Taille minimum : {attraction.taille_minimum} cm</p>
            {/* Autres informations à afficher ici */}
        </div>
    );
};

export default AttractionDetails;
