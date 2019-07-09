const {verifyUser, findUser} = require('./login');
const fs = require('fs');
const express = require('express');
const pgPromise = require('pg-promise')();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const private = fs.readFileSync('./private.key', 'utf8');
const public = fs.readFileSync('./public.key', 'utf8');

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

const app = express();
const expressPort = 3000;

const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'Bookish',
    user: 'Bookish',
    password: 'book1'
};

var database = pgPromise(cn);

const jwtoptions = {
    issuer: 'bookish',
    subject: 'user',
    audience: 'users',
    expiresIn: '12h',
    algorithm: 'RS256',
};

app.get('/books',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        database.many("select * from book")
        .then(function (data) {
            res.send(data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
);

app.get('/login', (req, res) => {
    verifyUser(req, res, database).then(data => {
        if (data) { 
            let token = jwt.sign({user: req.query.user}, private, jwtoptions);
            res.json( {
                token: token,
                success: true,
                message: "Authentication successful"});
        } else {
            res.json({
                success: false,
                message: "Authentication failed"});
        }
    })   
});

app.listen(expressPort, () => console.log(`Example app listening on port ${expressPort}!`))
