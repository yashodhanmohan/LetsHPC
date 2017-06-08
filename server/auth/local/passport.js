import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User, email, password, done) {
    User.findOne({
        $or: [{email: email.toLowerCase()}, {username: email.toLowerCase()}]
    }).exec()
    .then(user => {
        if (!user) {
            return done(null, false, {
                message: 'This email is not registered.'
            });
        }
        user.authenticate(password, function(authError, authenticated) {
            if (authError) {
                return done(authError, false, 'Authentication error.');
            }
            if (!authenticated) {
                return done(null, false, { message: 'This password is not correct.' });
            } else {
                user = user.toObject();
                delete user.password;
                return done(null, user);
            }
        });
    })
    .catch(err => done(err));
}

export function setup(User/*, config*/) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, function(email, password, done) {
        return localAuthenticate(User, email, password, done);
    }));
}
