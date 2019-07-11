const {Book, Author} = require('./databaseSetup');

async function createBook(title, isbn, fname, lname) {
    const row = await getAuthorId(fname, lname);
    if (row) {
        await Book.create( {
            title: title,
            authorid: row,
            isbn: isbn
        })
    } else {
        await Author.create({
            fname: fname,
            lname: lname
        })
        await createBook(title, isbn, fname, lname);
    }
}

async function getBook(isbn) {
    const book = await Book.findOne({
        where: {
            isbn: isbn
        }
    })
    return book;
}

async function getBooks(conditions) {
    const whereCond = conditions.title? {title: conditions.title} : {};
    const includeCond = {};
    if (conditions.fname) includeCond.fname = conditions.fname;
    if (conditions.lname) includeCond.lname = conditions.lname;
    const books = await Book.findAll({
        where: whereCond,
        include: {
            model: Author,
            where: includeCond
        }
    });

    return books;
}

async function getAuthorId(fname, lname) {
    const row = await database.oneOrNone("select * from author where fname = $1 and lname = $2", [fname, lname]);
    const row = await Author.findOne({
        where: {
            fname: fname,
            lname: lname
        }
    })
    if (!row) return null;
    return row.id;
}




module.exports = { createBook, getBook, getBooks };