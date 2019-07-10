const {verifyUser} = require('./login');
const {sign, jwtAuth} = require('./auth');
const {database} = require('./database');

const express = require('express');


const app = express();
const expressPort = 3000;


app.get('/books',
    jwtAuth,
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
            let token = sign(req.query.user)
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