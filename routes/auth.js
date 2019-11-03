// ...
const express = require("express");
const router = express.Router(); // ...
const passport = require("passport");
// Require the user schema
const User = require("../models/User");

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
   const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save()
        .then(() => { console.log('User saved into the database'); })
        .catch((err) => { console.log(err); });

    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;