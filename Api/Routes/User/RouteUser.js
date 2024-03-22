const express = require('express');
// Initialize express router
let router = require('express').Router();
// Set default API response

//route pour tester si mes fichier communique entre eux
router.get('/users', (req, res) => {
    res.send('This is the users page');
  });
//route pour tester la connexion a la bdd
router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// // routes pour se connecter
// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
  
//     db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, rows) => {
//       if (err) {
//         logger.error(err);
//       } else {
//         if (rows.length > 0) {
//           user = {
//             username: username,
//             password: password
//           };
//           const accessToken = generateToken(user);
//           res.json({ accessToken: accessToken });
//         } else {
//           res.send('Username ou password incorrect');
//         }
//       }
//     });
// });

module.exports = router;