import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../../assets/Context/UserContexte';
import { toast } from 'react-toastify';
import './Mission.css';

const Missions = () => {

    const { user } = useContext(UserContext);
    const [missions, setMissions] = useState([]);
    const [affectations, setAffectations] = useState([]);
    const [completedMissions, setCompletedMissions] = useState([]);
    const [comment, setComment] = useState(''); // Add this line
   

   const validateMission = async (missionId) => {
    try {
        // Find the affectation corresponding to the mission
        const affectation = affectations.find(affectation => affectation.id === missionId);

        if (!affectation) {
            console.error('No affectation found for mission:', missionId);
            return;
        }

        // Update the affectation to indicate that the mission is completed
        const response = await axios.put(`http://localhost:3000/user/finishmissions/${missionId}`, {
            est_valide: 1, // Mission completed
        });

        if (response.status === 200) {
            const updatedMissions = missions.map(mission => mission.id === missionId ? { ...mission, completed: true } : mission);
            setMissions(updatedMissions);

            const newCompletedMissions = updatedMissions.filter(mission => mission.completed);
            setCompletedMissions(newCompletedMissions);
        }
    } catch (error) {
        console.error('Error validating mission:', error);
    }
};
    const leaveComment = async (missionId, comment) => {
        try {
            const response = await axios.put(`http://localhost:3000/user/commentmissions/${missionId}`, {
                commentaires: comment,
            });

            if (response.status === 200) {
                const updatedMissions = missions.map(mission => mission.id === missionId ? { ...mission, comment } : mission);
                setMissions(updatedMissions);
            }
        } catch (error) {
            console.error('Error leaving comment:', error);
        }
    };

    const startMission = async (missionId) => {
    try {
        // Find the affectation corresponding to the mission
        const affectation = affectations.find(affectation => affectation.id === missionId);

        if (!affectation) {
            console.error('No affectation found for mission:', missionId);
            return;
        }

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

        // Use affectation.id_missions for the PUT request
        const response = await axios.put(`http://localhost:3000/user/startmissions/${affectation.id_missions}`, {
            date_prise_de_poste: formattedDate,
        });

        if (response.status === 200) {
            const updatedMissions = missions.map(mission => mission.id === missionId ? { ...mission, started: true } : mission);
            setMissions(updatedMissions);
        }
    } catch (error) {
        console.error('Error starting mission:', error);
    }
};

    useEffect(() => {
    if (user) {
        const fetchAffectationsAndMissions = async () => {
            try {
                const affectationsResponse = await axios.get(`http://localhost:3000/user/affectations/${user.id}`);
                const affectationsData = affectationsResponse.data;

                // Filtrer les affectations pour ne garder que celles qui ont id_utilisateurs égal à user.id
                const filteredAffectations = affectationsData.filter(affectation => affectation.id_utilisateurs === user.id);
                setAffectations(filteredAffectations);
                console.log(user.id);

                // Filtrer les affectations pour ne garder que celles qui ne sont pas validées
                const nonValidatedAffectations = filteredAffectations.filter(affectation => affectation.est_valide !== 1);

                // Récupérer les missions correspondantes
                const missionsPromises = nonValidatedAffectations.map(affectation => 
                    axios.get(`http://localhost:3000/user/missions/${affectation.id_missions}`) // Use id_missions instead of id_utilisateurs
                );
                const missionsResponses = await Promise.all(missionsPromises);
                const missionsData = missionsResponses.map(response => response.data);
                setMissions(missionsData);
                
                // Ajouter les affectations non validées à chaque mission
                const missionsWithAffectations = missionsData.map(mission => {
                    const affectationsForMission = nonValidatedAffectations.filter(affectation => affectation.id_missions === mission.id);
                    return {...mission, affectations: affectationsForMission};
                });
                setMissions(missionsWithAffectations);
            } catch (error) {
                console.error('Error fetching affectations or missions:', error);
            }
        };

        fetchAffectationsAndMissions();
    }
}, [user]);
    
return (
    <div>
        <h2>Mes missions </h2>
        <ul>
        {Array.isArray(missions) && missions.filter(mission => {
            return mission.affectations && !mission.affectations.find(affectation => affectation.est_valide === 1);
        }).map((mission) => {
                return (
                    <li key={mission.id}>
                        <h2>{mission.libelle}</h2>
                        <p>{mission.description}</p>
                        <button onClick={() => startMission(mission.id)}>Commencer la mission</button>
                        <button onClick={() => validateMission(mission.id)}>Terminer la mission</button>
                        <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Laissez un commentaire" />
                        <button onClick={() => leaveComment(mission.id, comment)}>Soumettre le commentaire</button>
                    </li>
                );
            })}
        </ul>
    </div>
);
}
export default Missions;