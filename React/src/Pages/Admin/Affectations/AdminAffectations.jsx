import React, { useState } from 'react';
import axios from 'axios';

function AffectationForm() {
  const [userId, setUserId] = useState('');
  const [missionId, setMissionId] = useState('');
  const [dateJour, setDateJour] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id_utilisateurs: userId,
      id_missions: missionId,
      date_jour: dateJour,
      commentaires: commentaire,
    };

    try {
      const response = await axios.post('/api/admin/affectations', data);
      console.log(response.data);
      alert('Affectation réussie!');
    } catch (error) {
      console.error('Erreur lors de l\'affectation:', error);
      alert('Erreur lors de l\'affectation');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Utilisateur ID:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Mission ID:
          <input
            type="number"
            value={missionId}
            onChange={(e) => setMissionId(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Date du jour:
          <input
            type="date"
            value={dateJour}
            onChange={(e) => setDateJour(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Commentaire:
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
          ></textarea>
        </label>
      </div>
      <button type="submit">Affecter</button>
    </form>
  );
}

export default AffectationForm;
