const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../../db');


let router = express.Router();


router.use(express.json());

//route qui ressort les attractions
router.get('/attractions', (req, res) => {
  db.query('SELECT * FROM attractions', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des attractions');
    } else {
      res.json(results);
    }
  });
});


  






module.exports = router;

