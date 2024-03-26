const express = require('express');

const db = require('../../db');

let router = express.Router();

router.get('/roles', (req, res) => {
  // Utilisez 'db' pour interagir avec la base de données
  db.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


// Exportez le routeur au lieu de l'application
module.exports = router;
