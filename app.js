// Require dependencies
// Express: Node.js framework - it allows to work with routes in Node.js (and more) more easily and with less code
const express = require('express');
const app = express();
const path = require('path'); // Use the path method that comes with Express
// Mongoose: ...
const mongoose = require('mongoose');
// Passport: ...
const passport = require("passport");
// Express-session: ...
const session = require("express-session");

// Require routes
const auth = require('./routes/auth');
const index = require('./routes/index');

// Set up view engine - all the main "pages" will be in the "views" folder
app.set('views', path.join(__dirname, 'views'));
// Set ejs as the template engine, so that when referring to a page, the .ejs extension is not necessary
app.set('view engine', 'ejs');
// Set up the "public" folder as the folder for "frontend stuff"
app.use(express.static('public'));

// This is used to parse request bodies
app.use(express.urlencoded({ extended: true }));
// This is used to send json-based requests
app.use(express.json({ extended: false }));

// Passport configuration
require('./middleware/authentication')(passport);

// Connect to the database
mongoose.connect('mongodb://localhost:27017/auth_example_1', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log(err));

// Initialize sessions with some options, including a secret key
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    expires: new Date(Date.now() + 3600000)
}));

// Initialize passport
app.use(passport.initialize());
// Initialize passport session
app.use(passport.session());

// Local variables
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Use the route required above
app.use('/', auth);
app.use('/dashboard', index);

// Set up a Node.js server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));