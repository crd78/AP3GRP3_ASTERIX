const express = require('express');

const db = require('../../db');

let router = express.Router();

router.get('/', (req, res) => {
    // Utilisez 'db' pour interagir avec la base de données
    db.query('SELECT * FROM attractions', (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  

module.exports = router;

