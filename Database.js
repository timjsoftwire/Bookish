const {database} = require('./databaseSetup');

async function createBook(title, isbn, fname, lname) {
    /*database.oneOrNone('select id from author where fname = $1 and lname = $2',[fname, lname])
    .then(row => {
        if (row) {
            database.query('insert into book (title, authorid, isbn) values ($1, $2, $3)',[title, row.id, isbn]);
        }
        else {
            database.query("insert into author (fname, lname) values ($1, $2)", [fname, lname])
            .then(() => createBook(title, isbn, fname, lname));
        }
    })
    .catch(err => { throw err; });
*/
    const row = await database.oneOrNone('select id from author where fname = $1 and lname = $2',[fname, lname]);
    if (row) {
        await database.query('insert into book (title, authorid, isbn) values ($1, $2, $3)',[title, row.id, isbn]);
    } else {
        await database.query("insert into author (fname, lname) values ($1, $2)", [fname, lname]);
        await createBook(title, isbn, fname, lname);
    }
}

async function getBook(isbn) {
    const book = await database.one('select * from book where isbn = $1', isbn);
    return book;
}

module.exports = { createBook, getBook };