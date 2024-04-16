import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AttractionsDetails.css';


const AttractionDetails = () => {
    // Utilisation d'un useParams pour récupérer l'ID de l'attraction
    const { id_attraction } = useParams();
    // Utilisation d'un useState pour stocker les détails de l'attraction
    const [attraction, setAttraction] = useState(null);


    // Utilisation d'un useEffect pour récupérer les détails de l'attraction
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

        // Appel de la fonction fetchAttractionDetails au chargement du composant
        fetchAttractionDetails();
    }, [id_attraction]); // Ici, un tableau de dépendances est utilisé pour que le useEffect s'exécute à chaque changement de l'ID de l'attraction

    // Si l'attraction n'est pas encore chargée, on affiche un message de chargement
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
        </div>
    );
};

export default AttractionDetails;
