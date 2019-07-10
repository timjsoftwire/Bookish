const {verifyUser} = require('./login');
const {sign, jwtAuth} = require('./auth');
const {database} = require('./databaseSetup');

const BookRoutes = require ('./bookController');

const express = require('express');


const app = express();
const expressPort = 3000;

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

app.listen(expressPort, () => console.log(`Example app listening on port ${expressPort}!`));

app.use('/books', BookRoutes);