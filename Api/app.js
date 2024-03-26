// app.js
const express = require('express');
const db = require('./db');
const app = express();
const user = require('./Routes/User/RouteUser');
const admin = require('./Routes/Admin/RouteAdmin');

app.use('/user', user);
app.use('/admin', admin);

app.get('/', (req, res) => {
  // Utilisez 'db' pour interagir avec la base de données
  db.query('SELECT * FROM attractions', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));