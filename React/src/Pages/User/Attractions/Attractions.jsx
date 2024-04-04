import React, { useEffect, useState } from 'react';

const Attractions = () => {
    // Déclaration d'un useState pour stocker les attractions
    const [attractions, setAttractions] = useState([]);

    // Utilisation d'un useEffect pour récupérer les attractions
    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                // Récupération des attractions
                const response = await fetch('http://localhost:3000/user/attractions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Attractions:", data)
                    setAttractions(data);
                } else {
                    console.error('Erreur lors de la petite des attractions:', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des attractions:', error);
            }
        };

        fetchAttractions();
    }, []);

    return (
        <div>
            <h1>Voici les attractions</h1>
            <ul>
                {attractions.map((attraction, index) => (
                    <li key={index}>{attraction.libelle}</li>
                ))}
            </ul>
        </div>
    );
};

export default Attractions;

