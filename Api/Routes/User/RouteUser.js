const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../../db');

let router = express.Router();

router.get('/', (req, res) => {
    // Utilisez 'db' pour interagir avec la base de données
    db.query('SELECT * FROM attractions', (err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

function generateToken(us){
    return jwt.sign(us, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
  }
  

router.get('/jwt', (req, res) => {
    const createTokenFromJson = (jsonData, options = {}) => {
      try {
        const secretKey = 'secret';
        const token = jwt.sign(jsonData, secretKey, options);
        return token;
      } catch (e) {
        console.error(e);
        return null;
      }
    };
  
    const jsonData = { email: '', password: '' };
    const token = createTokenFromJson(jsonData);
  
    if (token) {
      res.json({ status: true, token: token });
    } else {
      res.json({ status: false });
    }
});
//fonction dit middleware (permet de verifier l'état du token avant d'aller récupérer les informations pour notre utilisateur )
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }
      req.user = user;
      next();
    });
  }

// Route de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Vérification si l'utilisateur existe dans la base de données
    const checkUserQuery = 'SELECT * FROM utilisateurs WHERE email = ? AND password = ?';
    db.query(checkUserQuery, [email, password], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la vérification de l'utilisateur");
        return;
      }
  
      if (results.length === 0) {
        res.status(401).send("Nom d'utilisateur ou mot de passe incorrect");
        return;
      }
  
      // Authentification réussie, génération du token
      const user = { id: results[0].id, email: results[0].email };
      const token = generateToken(user);
  
      res.json({ token });
    });
});

module.exports = router;

