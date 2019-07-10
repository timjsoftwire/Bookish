const {database} = require('./databaseSetup');

async function createBook(title, isbn, fname, lname) {
    const row = await getAuthorId(fname, lname);
    if (row) {
        await database.query('insert into book (title, authorid, isbn) values ($1, $2, $3)',[title, row, isbn]);
    } else {
        await database.query("insert into author (fname, lname) values ($1, $2)", [fname, lname]);
        await createBook(title, isbn, fname, lname);
    }
}

async function getBook(isbn) {
    const book = await database.one('select * from book where isbn = $1', isbn);
    return book;
}

async function getBooks(conditions) {
    let conditionsArray = [];
    let conditionsString = "";

    if (conditions.fname) {
        conditionsArray.push(`LOWER(author.fname) = LOWER('${conditions.fname}')`);
    }
    if (conditions.lname) {
        conditionsArray.push(`LOWER(author.lname) = LOWER('${conditions.lname}')`);
    }
    if (conditions.title) {
        conditionsArray.push(`LOWER(book.title) = LOWER('${conditions.title}')`);
    }
    if (conditionsArray.length) {
        conditionsString = " where " + conditionsArray.join(" and ");
    }

    const query = "select book.id, title, isbn, fname, lname from book join author on book.authorid = author.id" + conditionsString;
    const books = await database.any(query); 
    return books;
}

async function getAuthorId(fname, lname) {
    const row = await database.oneOrNone("select * from author where fname = $1 and lname = $2", [fname, lname]);
    if (!row) return null;
    return row.id;
}




module.exports = { createBook, getBook, getBooks };