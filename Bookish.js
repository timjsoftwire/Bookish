const {verifyUser} = require('./login');
const jwt = require('jsonwebtoken')

const express = require('express');
const pgPromise = require('pg-promise')();
const fs = require('fs');

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
const private = fs.readFileSync('./private.key', 'utf8');
const public = fs.readFileSync('./public.key', 'utf8');

app.get('/books', (req, res) => {
    database.many("select * from book")
    .then(function (data) {
        res.send(data);
    })
    .catch(function(error) {
        console.log(error);
    })
});

app.get('/login', (req, res) => {
    verifyUser(req, res, database).then(data => {
        if (data) { 
           


            let token = jwt.sign({user: req.query.user}, private, jwtoptions);
            console.log(token);
            res.send("Verified!");
        } else {
            res.send("We don't know who you are...");
        }  
    })
    
        
});

app.listen(expressPort, () => console.log(`Example app listening on port ${expressPort}!`))