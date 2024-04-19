const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../../db');
const cors = require('cors');
const { Console } = require('winston/lib/winston/transports');

let router = express.Router();

router.use(cors());

router.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, utilisateurs) => {
    if (err) {
      console.error('Erreur lors de la vérification du token :', err);
      return res.sendStatus(403);
    }

    // console.log('Utilisateurs:', utilisateurs); // Log the user object

    req.utilisateurs = utilisateurs;

    next();
  });
}


//route qui recupere les alerts
router.get('/avertissements', (req, res) => {
  const query = 'SELECT * FROM avertissements';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des alerts');
      return;
    }

    res.json(results);
  });
});

// Route récupérant les attractions
router.get('/attractions', (req, res) => {
  const query = 'SELECT * FROM attractions INNER JOIN themes ON attractions.id_themes = themes.id';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des attractions');
      return;
    }

    res.json(results);
  });
});

// Router récupérant les détails d'une attraction
router.get('/attractions/:id', (req, res) => {
  const query = 'SELECT * FROM attractions WHERE id_attraction = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des détails de l\'attraction');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Attraction non trouvée');
      return;
    }

    res.json(results[0]);
  });
});

function getIdSession(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.id;
    return userId;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', error);
    return null;
  }
}




  router.get('/missions', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const userId = getIdSession(token);

    console.log('id: ', userId);

  const query = `
    SELECT M.libelle, M.description, M.id
    FROM missions M
    WHERE M.id IN (SELECT A.id_missions FROM affectations A WHERE A.id_utilisateurs = ?)
    `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err); // Afficher l'erreur SQL
      res.status(500).json({ message: 'Vous n\'avez pas de missions !' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Mission non trouvée' });
      return; 
    }
    console.log('results:', results);
    res.json(results);
  });
});









module.exports = router;


router.put('/missions/:id/complete', authenticateToken, (req, res) => {

  const missionId = req.params.id;

  const query = 'UPDATE affectations SET est_valide = 1 WHERE id_missions = ?';
  
  db.query(query, [missionId], (err, results) => {
      if (err) {
          console.error('Erreur lors de la mise à jour de la mission:', err);
          res.status(500).json({ message: 'Erreur lors de la mise à jour de la mission' });
          return;
      }

      if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Mission non trouvée' });
          return;
      }

      console.log('nickel')

      return res.json({ message: 'Mission mise à jour avec succès' });
  });
});

// ...
