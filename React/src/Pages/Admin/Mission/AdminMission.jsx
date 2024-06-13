import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './AdminMission.css';

const AdminMission = () => {
    const [libelle, setLibelle] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [missions, setMissions] = useState([]);
    const [userId, setUserId] = useState('');
    const [showAffectationForm, setShowAffectationForm] = useState({});
    const [affectations, setAffectations] = useState([]);

    useEffect(() => {
        fetchMissions();
        fetchAffectations();
    }, []);


    const fetchMissions = async () => {
        try {
            const token = localStorage.getItem('token'); // Récupérez le token du localStorage
            const response = await axios.get('http://localhost:3000/admin/missions', {
                headers: {
                    Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
                }
            });

            if (response.status === 200) {
                setMissions(response.data);
            }
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des missions');
        }
    };

    const fetchAffectations = async () => {
    try {
        const token = localStorage.getItem('token'); // Récupérez le token du localStorage
        const response = await axios.get('http://localhost:3000/admin/affectations', {
            headers: {
                Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
            }
        });
        setAffectations(response.data);
    } catch (error) {
        console.error('Error fetching affectations:', error);
    }
};

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const token = localStorage.getItem('token'); // Récupérez le token du localStorage
            const response = await axios.post('http://localhost:3000/admin/ajouterMission', {
                libelle,
                description
            }, {
                headers: {
                    Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
                }
            });
    
            if (response.status === 200) {
                alert('Mission ajoutée');
                setLibelle('');
                setDescription('');
                setShowForm(false);
                fetchMissions(); // Fetch the updated list of missions
            }
        } catch (error) {
            console.error(error);
            alert('Erreur lors de l\'ajout de la mission');
        }
    };
    const handleAffectation = async (missionId, event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Récupérez le token du localStorage
            const response = await axios.post('http://localhost:3000/admin/affecterMission', {
                id_utilisateurs: userId,
                id_missions: missionId,
                date_jour: new Date().toISOString().slice(0, 10)
            }, {
                headers: {
                    Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
                }
            });

            if (response.status === 200) {
                alert('Mission affectée');
                setUserId('');
            }
        } catch (error) {
            console.error(error);
            alert('Erreur lors de l\'affectation de la mission');
        }
    };
   
    const handleDelete = async (missionId) => {
    try {
        const token = localStorage.getItem('token'); // Récupérez le token du localStorage
        const response = await axios.delete(`http://localhost:3000/admin/supprimerMission/${missionId}`, {
            headers: {
                Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
            }
        });

        if (response.status === 200) {
            alert('Mission supprimée');
            fetchMissions(); // Rechargez les missions après la suppression
        }
    } catch (error) {
        console.error(error);
        alert('Erreur lors de la suppression de la mission');
    }
};

return (
    <div>
        <h2>Missions</h2>
        <button onClick={() => setShowForm(true)}>Ajouter une mission</button>
        {showForm && (
            <form onSubmit={handleSubmit}>
                <label>
                    Libelle:
                    <input type="text" value={libelle} onChange={e => setLibelle(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                </label>
                <button type="submit">Ajouter</button>
            </form>
        )}
        {missions.map(mission => {
            const affectation = affectations.find(a => a.id_missions === mission.id);
            return (
                <div key={mission.id}>
                    <h3>{mission.libelle}</h3>
                    <p>{mission.description}</p>
                    {affectation && (
                        <p>Commentaire du personnel : {affectation.commentaire}</p>
                    )}
                    <button onClick={() => handleDelete(mission.id)}>Supprimer</button>
                    <button onClick={() => setShowAffectationForm({ ...showAffectationForm, [mission.id]: true })}>Affecter à un utilisateur</button>
                    {showAffectationForm[mission.id] && (
                        <form onSubmit={(event) => handleAffectation(mission.id, event)}>
                            <label>
                                ID de l'utilisateur:
                                <input type="text" value={userId} onChange={e => setUserId(e.target.value)} required />
                            </label>
                            <button type="submit">Affecter</button>
                        </form>
                    )}
                </div>
            );
        })}
    </div>
);
}

export default AdminMission;