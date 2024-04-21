import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Attractions.css';

const Attractions = () => {
    const [themedAttractions, setThemedAttractions] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/attractions');
                if (response.ok) {
                    const data = await response.json();
                    const themes = {};

                    // Grouper les attractions par thème
                    data.forEach(attraction => {
                        if (!themes[attraction.libelle]) {
                            themes[attraction.libelle] = [attraction];
                        } else {
                            themes[attraction.libelle].push(attraction);
                        }
                    });

                    // Limiter chaque thème à 4 attractions
                    for (const theme in themes) {
                        themes[theme] = themes[theme].slice(0, 5);
                    }

                    setThemedAttractions(Object.entries(themes));
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
            <p className='description'>Quand nos Gaulois ne sont pas en train de repousser l’envahisseur, ils ont de quoi s’amuser :
                découvrez nos différentes attractions, plus folles les unes que les autres… Et il y en a pour tous les goûts !</p>
            <input className="filtre" type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filtrer les attractions" />

            {themedAttractions.map(([theme, attractions]) => (
                <div key={theme}>
                    <div className="attractions-container">
                        <div className='nomTheme'>
                            <h1 className='themeAttraction'>{theme}</h1>
                            <Link to={`/attractions/${theme.id}`} className="voir-plus-link">Voir plus →</Link>
                        </div>
                        <div className='attractions'>
                            {attractions
                                .filter(attraction => attraction.nom.toLowerCase().includes(filter.toLowerCase()))
                                .map((attraction, index) => (
                                    <Link to={`/attractions/${attraction.id_attraction}`} key={index} className="attraction-link link-unstyled">
                                        <div className="card">
                                            <img src={attraction.image} alt={`Image de ${attraction.nom}`} className="attraction-image" />
                                            <p className="card-text">{attraction.numero}</p>
                                            <h2 className="card-title">{attraction.nom}</h2>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default Attractions;
