const express = require('express');
// Initialize express router
const router = express.Router();
const jwt = require('jsonwebtoken');
// Set default API response
const connectDB = require('../../app').connectDB;

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

  //route pour tester si mes fichier communique entre eux
router.get('/Admin', (req, res) => {
    res.send('This is the admin page');
});

//route pour tester la connexion a la bdd
router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

  //route pour récupérer les informations de l'utilisateur
router.get('/user', authenticateToken, (req, res) => {
    const connection = connectDB();
    connection.query('SELECT * FROM user', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});;

// Export API routes
exports.router = router;



