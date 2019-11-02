// ...
const express = require("express");
const router = express.Router(); // ...
// Require the user schema
const User = require("../models/User");

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    // ...
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    // ...
});

router.get('/login', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;