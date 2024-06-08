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

    console.log('Utilisateurs:', utilisateurs); // Log the user object

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

// Route récupérant les détails d'une attraction
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



// Route récupérant toutes les attractions liées à un thème spécifique
router.get('/attractions/theme/:themeID', (req, res) => {
  const query = 'SELECT * FROM attractions WHERE id_themes = ?';
  db.query(query, [req.params.themeID], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des attractions');
      return;
    }

    res.json(results);
  });
});

router.get('/affectations/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM affectations WHERE id_utilisateurs = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des missions');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Aucune mission trouvée pour cet utilisateur');
      return;
    }

    res.json(results);
  });
});

// Route récupérant les détails d'une mission
router.get('/missions/:Id', (req, res) => {
  const Id = req.params.Id;
  const query = 'SELECT * FROM missions WHERE id = ?';

  db.query(query, [Id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des détails de la mission');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Mission non trouvée');
      return;
    }

    res.json(results[0]);
  });
});


router.post('/takemissions', (req, res) => {
  const query = 'INSERT INTO affectations (id_utilisateurs, id_missions, date_jour, est_valide, date_prise_de_poste, commentaires) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [req.body.id_utilisateurs, req.body.id_missions, req.body.date_jour, req.body.est_valide, req.body.date_prise_de_poste, req.body.commentaires], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error while assigning the mission', error: err });
      return;
    }

    res.status(200).json({ message: 'Mission assigned successfully' });
  });
});

router.put('/finishmissions/:missionId', (req, res) => { 
  const missionId = req.params.missionId;
  const query = 'UPDATE affectations SET est_valide = 1 WHERE id_missions = ?';

  db.query(query, [missionId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error while finishing the mission', error: err });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Mission not found' });
      return;
    }

    res.status(200).json({ message: 'Mission finished successfully' });
  });
});

router.put('/commentmissions/:missionId', (req, res) => { 
  const missionId = req.params.missionId;
  const comment = req.body.commentaires;
  const query = 'UPDATE affectations SET commentaires = ? WHERE id_missions = ?';

  db.query(query, [comment, missionId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error while leaving a comment', error: err });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Mission not found' });
      return;
    }

    res.status(200).json({ message: 'Comment left successfully' });
  });
});

// Route updating the start date of a mission
router.put('/startmissions/:missionId', (req, res) => {
  const missionId = req.params.missionId;
  const date_prise_de_poste = req.body.date_prise_de_poste;
  const query = 'UPDATE affectations SET date_prise_de_poste = ? WHERE id_missions = ?';

  db.query(query, [date_prise_de_poste, missionId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error while starting a mission');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Mission not found');
      return;
    }

    res.status(200).send('Mission started successfully');
  });
});


module.exports = router;
