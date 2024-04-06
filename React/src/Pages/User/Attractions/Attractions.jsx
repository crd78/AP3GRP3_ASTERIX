import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Attractions.css';

const Attractions = () => {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/attractions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAttractions(data);
                } else {
                    console.error('Erreur lors de la récupération des attractions:', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des attractions:', error);
            }
        };

        fetchAttractions();
    }, []);

    return (
        <div>
            <h1>LES ATTRACTIONS DU PARC</h1>
            <p>Quand nos Gaulois ne sont pas en train de repousser l’envahisseur, ils ont de quoi s’amuser :
                découvrez nos différentes attractions, plus folles les unes que les autres… Et il y en a pour tous les goûts !</p>
            <div className="attractions-container">
                {attractions.map((attraction, index) => (
                    <Link to={`/attractions/${attraction.id_attraction}`} key={index} className="attraction-link">
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
