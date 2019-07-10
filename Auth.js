const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const private = fs.readFileSync('./private.key', 'utf8');

const {findUser} = require('./database/databaseAccounts');
const {database} = require('./database/databaseSetup');

const jwtoptions = {
    expiresIn: '12h',
};

const jwtStratOptions = {
    secretOrKey: private,
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
}

passport.use(new JwtStrategy(jwtStratOptions, (jwt_payload, done) => {
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

function sign(user) {
    return jwt.sign({user}, private, jwtoptions);
}

const jwtAuth = passport.authenticate('jwt', {session: false});

module.exports = { sign, jwtAuth };