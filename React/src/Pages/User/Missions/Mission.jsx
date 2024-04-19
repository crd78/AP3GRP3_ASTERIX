import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Mission = () => {
    const [missions, setMissions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/User/missions', {
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des missions');
                }

                const data = await response.json();
                setMissions(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des missions:', error);
                setError(error.message);
            }
        };

        fetchMissions();
    }, []);

    const completeMission = async (missionId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/User/missions/${missionId}/complete`, {
                headers: {
                    'authorization': `Bearer ${token}`
                },
                method: 'PUT',
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la mission');
            }
    
            // Mettre à jour l'état de la mission pour refléter les changements
            setMissions(prevMissions => prevMissions.map(mission => 
                mission.id === missionId ? {...mission, affectation: true} : mission
            ));
    
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la mission:', error);
            setError(error.message);
        }
    };
    

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
                        {/* boutton pour dire que la mission est terminé  */}
                        <button onClick={() => completeMission(mission.id)}>Mission Finis</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mission;
