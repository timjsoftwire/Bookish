const {Book, Author, Entry} = require('./databaseSetup');

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

async function getNumberOfCopies(bookid) {
    const data = await Entry.findAll({
        where: {
            bookid: bookid
        }
    });
    return data? data.length : 0;
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

    const promises = books.map(async function(book) {
        const copyCount = await getNumberOfCopies(book.id);
        return {
            copies: copyCount,
            title: book.title,
            isbn: book.isbn,
            author: book.author,
            id: book.id,
        }
    });
    const filteredBooks = await Promise.all(promises);

    return filteredBooks;
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