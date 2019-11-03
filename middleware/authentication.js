const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({username: username})
                .then((user) => {
                    if (!user) {
                        return done(null, false, { error: 'Invalid credentials' });
                    }

                    if (user.password !== password) {
                        return done(null, false, { error: 'Invalid credentials' });
                    }

                    return done(null, user);
                })
                .catch((err) => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

