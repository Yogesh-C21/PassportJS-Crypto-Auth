const passport = require('passport');
const { validPassword } = require('../lib/passwordUtils');
const LocalStrategy = require('passport-local');
const connection = require('./database');
const User = connection.models.User;

/* const customFields = {
    usernameField: 'uname',
    passwordField: 'pword',
    passReqToCallback: true
}; */

const verifyCallback = function (username, password, done) {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        const isValid = validPassword(password, user.hash, user.salt);
        if(isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }

        /*Another Method */
        /* crypto.pbkdf2Sync(password, user.salt, 10000, 32, 'sha256', function(err, hashedPassword) {
            console.log(hashedPassword);
            if (err) { return done(err); }
            if (!crypto.timingSafeEqual(user.hash, hashedPassword)) {
              return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        }); */
    });     
}

const strategy = new LocalStrategy(/* customFields,  */verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then((user) => { 
        done(null, user); 
    })
    .catch((err) => { 
        done(err)
    });
});
