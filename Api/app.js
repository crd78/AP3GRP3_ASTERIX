const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const winston = require('winston');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mysql = require('mysql2');
let router = require('express').Router();

const adminRoutes = require('./Routes/Admin/RouteAdmin.js');

<<<<<<< HEAD
=======
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tkt',//nom de la bdd
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
>>>>>>> 64687d1a2651808a1814438df9fba9f074b42b05

app.use(bodyParser.json());
app.use(cors());

app.use('/admin', adminRoutes);

//fonction qui se connecte a la db
function connectDB() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tkt'
    });
    return connection;
}

module.exports = connectDB;


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
  
