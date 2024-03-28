// db.js
const mysql = require('mysql2');

// Créer une connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tkt',
  port: 8889
});
module.exports = db;
