import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AttractionAll = ({ id_themes }) => {
    // State pour stocker les attractions
    const [attractions, setAttractions] = useState([]);

    // Effet pour récupérer les attractions du thème sélectionné
    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                // Requête pour récupérer les attractions du thème sélectionné
                const response = await fetch(`http://localhost:3000/user/attractions/theme/${id_themes}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    // Conversion de la réponse en JSON et stockage des attractions
                    const data = await response.json();
                    setAttractions(data);
                } else {
                    console.error('Erreur lors de la récupération des attractions:', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des attractions:', error);
            }
        };

        // Appel de la fonction fetchAttractions au chargement du composant
        fetchAttractions();
    }, [id_themes]); // Le useEffect s'exécutera à chaque changement du thème sélectionné

    return (
        <div>
            <h1>{id_themes}</h1>
            {/* Affichage des attractions */}
            {attractions.map((attraction, index) => (
                <Link to={`/attractions/${attraction.id_attraction}`} key={index} className="attraction-link link-unstyled">
                    <div className="card">
                        <img src={attraction.image} alt={`Image de ${attraction.nom}`} className="attraction-image" />
                        <p className="card-text">{attraction.numero}</p>
                        <h2 className="card-title">{attraction.nom}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AttractionAll;
