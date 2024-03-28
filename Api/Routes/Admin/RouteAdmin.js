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

// ajouter la fonction verifyAdmin et authenticateToken à toute les routes ici 

//route qui recupere les alerts
router.get('/avertissements',verifyAdmin, (req, res) => {
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

//route qui supprime une alerts
router.delete('/avertissements/:id',verifyAdmin, (req, res) => {
  const query = 'DELETE FROM avertissements WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de l\'alert');
      return;
    }

    res.status(200).send('Alert supprimée');
  });
});

//route qui modifie une alerte
router.put('/avertissements/:id',verifyAdmin, (req, res) => {
  const query = 'UPDATE avertissements SET message = ? WHERE id = ?';
  db.query(query, [req.body.message, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la modification de l\'alert');
      return;
    }

    res.status(200).send('Alert modifiée');
  });
});




// Exportez le routeur au lieu de l'application
module.exports = router;
