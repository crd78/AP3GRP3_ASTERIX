const express = require('express');
require('dotenv').config();
const db = require('../../db');
const jwt = require('jsonwebtoken');
let router = express.Router();

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

  //fonction dit middleware (permet de verifier l'état du token avant d'aller récupérer les informations pour notre utilisateur )

  function verifyAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    console.log('Token:', token); // Étape de dépannage 1
  
    if (token == null) return res.sendStatus(401); // if there isn't any token
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, utilisateurs) => {
      if (err) {
        console.error('Erreur lors de la vérification du token :', err);
        return res.sendStatus(403);
      }
  
      console.log('Utilisateurs:', utilisateurs); // Étape de dépannage 2
  
      // Vérifiez si le rôle de l'utilisateur est 2
      if (Number(utilisateurs.role) !== 2) { // Étape de dépannage 3
        return res.status(403).send('Accès refusé');
      }
  
      // Si le rôle de l'utilisateur est 2, passez au prochain middleware
      next();
    });
  }

//route qui sort les attractions
router.get('/attractions', verifyAdmin,authenticateToken, (req, res) => {
    db.query('SELECT * FROM attractions', (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

 



// Exportez le routeur au lieu de l'application
module.exports = router;
