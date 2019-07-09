const express = require('express');
const pgPromise = require('pg-promise')();

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

app.get('/', (req, res) => {
    database.one("select * from book")
    .then(function (data) {
        res.send(data);
    })
    .catch(function(error) {
        console.log(error);
    })
})

app.listen(expressPort, () => console.log(`Example app listening on port ${expressPort}!`))