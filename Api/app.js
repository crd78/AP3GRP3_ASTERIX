const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const winston = require('winston');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',//nom de la bdd
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const config = require('./app.js');
let user = {};

function generateToken(us){
    return jwt.sign(us, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    }
  
  // Configuration de winston
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'app.log' }),
    ],
});

sapp.use(bodyParser.json());
app.use(cors());

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

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
  
