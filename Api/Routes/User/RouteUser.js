const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../../db');
const cors = require('cors');


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
  const query = 'SELECT * FROM attractions';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des attractions');
      return;
    }

    res.json(results);
  });
});


  






module.exports = router;

