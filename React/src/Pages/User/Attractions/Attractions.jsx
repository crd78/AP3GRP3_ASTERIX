import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Attractions.css';

const Attractions = () => {
    // Ajout d'un useState pour stocker les attractions
    const [attractions, setAttractions] = useState([]);

    // Ajout d'un useEffect pour récupérer les attractions
    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                // Requête GET pour récupérer les attractions
                const response = await fetch('http://localhost:3000/user/attractions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                // Vérification de la réponse
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
    }, []); // Le tableau de dépendances est vide pour que le useEffect ne s'exécute qu'une seule fois

    return (
        <div>
            <h1>LES ATTRACTIONS DU PARC</h1>
            <p>Quand nos Gaulois ne sont pas en train de repousser l’envahisseur, ils ont de quoi s’amuser :
                découvrez nos différentes attractions, plus folles les unes que les autres… Et il y en a pour tous les goûts !</p>
            <div className="attractions-container">
                {/* Pour chaque attraction dans la liste d'attractions, générer un composant de lien */}
                {attractions.map((attraction, index) => (
                    <Link to={`/attractions/${attraction.id_attraction}`} key={index} className="attraction-link link-unstyled">
                        <div className="card">
                            <img src={attraction.image} alt={`Image de ${attraction.nom}`} className="attraction-image" />
                            <p className="card-text">{attraction.numero}</p>
                            <h2 className="card-title">{attraction.nom}</h2>
                            <p className="card-text">Thème : {attraction.libelle}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Attractions;
