const { jwtAuth } = require ('./auth');
const { Router } = require('express');
const { createBook, getBook, getBooks } = require('./databaseBooks');

 
class BookController {
    constructor() {
        this.router = Router();
        this.router.get('/:isbn', jwtAuth, this.getBookRoute.bind(this));
        this.router.post('/', jwtAuth, this.createBookRoute.bind(this));
        this.router.get('/', jwtAuth, this.showBooksRoute.bind(this));
    }
 
    async getBookRoute(request, response) {
        const isbn = request.params.isbn;
        try {
            const book = await getBook(isbn);
            response.send(book);
        } catch (err) {
            response.send(err);
        }
    }
 
    async createBookRoute(request, response) {
        const fname = request.query.fname;
        const lname = request.query.lname;
        const title = request.query.title;
        const isbn = request.query.isbn;

        try {
            await createBook(title, isbn, fname, lname);
            response.send({isbn});
        } catch (err) {
            response.send(err);
        }
    }

    async showBooksRoute(request, response) {
        try {
            // conditions is optional, contains {fname: ..., lname: ..., title: ...}
            const conditions = request.query;
            const books = await getBooks(conditions);
            response.send(books);
        } catch (err) {
            response.send(err);
        }
    }

}
 
module.exports = new BookController().router;