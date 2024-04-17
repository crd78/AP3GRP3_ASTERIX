import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Mission = () => {
    const [missions, setMissions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage ou un autre endroit
                const response = await fetch('http://localhost:3000/user/missions', {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des missions');
                }

                const data = await response.json();
                setMissions(data);
                console.log(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des missions:', error);
                setError(error.message);
            }
        };

        fetchMissions();
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div>
            <h1>Missions</h1>
            <ul>
                {missions.map((mission) => (
                    <li key={mission.id}>
                        <h2>{mission.libelle}</h2>
                        <p>{mission.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mission;
