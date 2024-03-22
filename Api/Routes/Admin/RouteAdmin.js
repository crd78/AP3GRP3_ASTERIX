const express = require('express');
// Initialize express router
let router = require('express').Router();
// Set default API response

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

module.exports = router;
