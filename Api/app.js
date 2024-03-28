// app.js
const express = require('express');
const db = require('./db');
const app = express();
const user = require('./Routes/User/RouteUser');
const admin = require('./Routes/Admin/RouteAdmin');
const jwt = require('jsonwebtoken');
const cors = require("cors");


app.use('/user', user);
app.use('/admin', admin);
app.use(express.json());
app.use(cors());


function generateToken(utilisateurs){
  console.log('Génération du token pour l\'utilisateur :', utilisateurs, 'avec le rôle :', utilisateurs.id_roles);
  return jwt.sign({ id: utilisateurs.id, role: utilisateurs.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3s' });
}

app.get('/jwt', (req, res) => {
  // Récupérez l'utilisateur de la base de données
  db.query('SELECT * FROM utilisateurs WHERE email = ? AND password = ?', [req.body.email, req.body.password], (error, results) => {
    
    if (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    } else if (results.length === 0) {
      res.status(404).send('Utilisateur non trouvé');
    } else {
      // Créez le token avec le rôle de l'utilisateur
      const utilisateurs = { id: results[0].id, email: results[0].email, role: results[0].id_roles };
      const token = jwt.sign(utilisateurs, 'secret', { expiresIn: '1h' });
      

      res.json({ token });
    }
  });
});


// Route de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérification si l'utilisateur existe dans la base de données
  const checkUserQuery = 'SELECT id, email, id_roles FROM utilisateurs WHERE email = ? AND password = ?';
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
    const utilisateurs = { id: results[0].id, email: results[0].email, role: results[0].id_roles };
    const token = generateToken(utilisateurs);

    res.json({ token });
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Route de déconnexion
app.post('/deconnexion', (requete, reponse) => {
    reponse.status(200).json({ status: true, message: "Déconnexion réussie" });
})