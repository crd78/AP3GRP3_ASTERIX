const express = require('express');
require('dotenv').config();
const db = require('../../db');
const jwt = require('jsonwebtoken');
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

  //fonction dit middleware (permet de verifier l'état du token avant d'aller récupérer les informations pour notre utilisateur )

  function verifyAdmin(req, res, next) {
    console.log('Headers:', req.headers); // Ajoutez cette ligne
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
router.delete('/DelAvertissements/:id',verifyAdmin,(req, res) => {
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
router.put('/ModifAvertissements/:id',verifyAdmin, (req, res) => {
  const query = 'UPDATE avertissements SET message = ?, id_niveaux = ? WHERE id = ?';
  db.query(query, [req.body.message,req.body.id_niveaux, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la modification de l\'alert');
      return;
    }

    res.status(200).send('Alert modifiée');
  });
});

//route pour crée une alerte
router.post('/CreateAvertissements',verifyAdmin, (req, res) => {
  const query = 'INSERT INTO avertissements (message, id_niveaux) VALUES (?, ?)';
  db.query(query, [req.body.message, req.body.id_niveaux], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la création de l\'alert');
      return;
    }

    res.status(200).send('Alert créée');
  });
});


// Route permettant de récupérer les utilisateurs
router.get('/utilisateurs', (req, res) => {
  const query = 'SELECT * FROM utilisateurs';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
      return;
    }

    res.json(results);
  });
});

// Route permettant de récupérer les utilsateurs par leur id
router.get('/USERS/:id', (req, res) => {
  const query = 'SELECT * FROM utilisateurs WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
      return;
    }

    res.json(results[0]);
  });
});

// Route permettant de modifier un utilisateur
router.put('/modifierUtilisateur/:id', (req, res) => {
  const query = 'UPDATE utilisateurs SET prenom = ?, nom = ?, email = ?, code_postal = ?, ville = ?, adresse = ? WHERE id = ?';
  db.query(query, [req.body.prenom, req.body.nom, req.body.email, req.body.code_postal, req.body.ville, req.body.adresse, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la modification de l\'utilisateur');
      return;
    }

    res.status(200).send('Utilisateur modifié');
  });
});


// Route permettant de supprimer un utilisateur
router.delete('/supprimerUtilisateur/:id', (req, res) => {
  const query = 'DELETE FROM utilisateurs WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
      return;
    }

    res.status(200).send('Utilisateur supprimé');
  });
});

// Route permettant d'ajouter un utilisateur
router.post('/ajouterUtilisateur',(req, res) => {
  const query = 'INSERT INTO utilisateurs (prenom, nom, email, password, code_postal, ville, adresse, id_roles, id_metiers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [req.body.prenom, req.body.nom, req.body.password, req.body.email, req.body.code_postal, req.body.ville, req.body.adresse, req.body.id_roles, req.body.id_metiers], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
      return;
    }

    res.status(200).send('Utilisateur ajouté');
  });
});

//route pour ajouter une mission

router.post('/ajouterMission', verifyAdmin, (req, res) => {
  const query = 'INSERT INTO missions (libelle, description) VALUES (?, ?)';
  db.query(query, [req.body.libelle, req.body.description], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l\'ajout de la mission');
      return;
    }

    res.status(200).send('Mission ajoutée');
  });
});

router.post('/affecterMission', verifyAdmin, (req, res) => {
    const query = 'INSERT INTO affectations (id_utilisateurs, id_missions, date_jour) VALUES (?, ?, ?)';
    db.query(query, [req.body.id_utilisateurs, req.body.id_missions, req.body.date_jour], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'affectation de la mission:', err);
            res.status(500).send('Erreur lors de l\'affectation de la mission');
        } else {
            res.status(200).send('Mission affectée');
        }
    });
});

// ROUTE QUI RECUPERE TOUTE LES MISSIONS
router.get('/missions', verifyAdmin, (req, res) => {
  const query = 'SELECT missions.* FROM missions ';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des missions');
      return;
    }

    res.json(results);
  });
});

//route pour afficher affectations
router.get('/affectations', verifyAdmin, (req, res) => {
  const query = 'SELECT affectations.* FROM affectations ';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des affectations');
      return;
    }

    res.json(results);
  });
});

//route pour supprimer une mission

router.delete('/supprimerMission/:id', verifyAdmin, (req, res) => {
  const query = 'DELETE FROM missions  WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de la mission');
      return;
    }

    res.status(200).send('Mission supprimée');
  });
});


// Exportez le routeur au lieu de l'application
module.exports = router;
