const pgPromise = require('pg-promise')();

const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'Bookish',
    user: 'Bookish',
    password: 'book1'
};

exports.database = pgPromise(cn);