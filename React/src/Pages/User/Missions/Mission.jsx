import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Mission = () => {
    const [missions, setMissions] = useState([]);
    const [error, setError] = useState(null);
    // Création d'un objet Date
    let date = new Date();

    // Configuration du fuseau horaire de Paris (UTC+2 en été)
    let options = { timeZone: 'Europe/Paris' };

    // Conversion de la date en heure locale de Paris
    let dateLocaleParis = date.toLocaleString('fr-FR', {...options,
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });


    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage ou un autre endroit
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
            
            <h1>Missions du {dateLocaleParis}</h1>
            <ul>
                {missions.map((mission) => (
                    <li key={mission.id}>
                        <h2>{mission.libelle}</h2>
                        <p>{mission.description}</p>
                        {/* Cekcbox pour  prendre cette mission  */}
                        <Link to={`/mission/${mission.id}`}>Prendre cette mission</Link>
                        {/* boutton pour dire que la mission est terminé  */}
                        <button>Mission Finis</button>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mission;
