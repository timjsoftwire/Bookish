const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const private = fs.readFileSync('./private.key', 'utf8');
const public = fs.readFileSync('./public.key', 'utf8');

const jwtoptions = {
    issuer: 'bookish',
    subject: 'user',
    audience: 'users',
    expiresIn: '12h',
    algorithm: 'RS256',
};

const jwtStratOptions = {
    secretOrKey: public,
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
}

passport.use(new JwtStrategy(jwtStratOptions, function(jwt_payload, done) {
    findUser(jwt_payload.user, database)
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            console.log(err);
            return done(err, null);
        });
}));

exports.sign = function(user) {
    return jwt.sign({user}, private, jwtoptions);
}

exports.jwtAuth = passport.authenticate('jwt', {session: false});