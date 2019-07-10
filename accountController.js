const { jwtAuth } = require ('./auth');
const { Router } = require('express');
const { login, register } = require('./account');

class AccountController {
    constructor() {
        this.router = Router();
        this.router.post('/register', this.registerRoute.bind(this));
        this.router.post('/login', this.loginRoute.bind(this));
    }

    async registerRoute(request, response) {
        const user = request.query.user;
        const pass = request.query.pass;
        try {
            const data = await register(user, pass);
            response.send(data);
        } catch (err) {
            response.send(err);
        }
    }

    async loginRoute(request, response) {
        const username = request.query.user;
        const pass = request.query.pass;

        try {
            const data = await login(username, pass);
            response.send(data);
        } catch (err) {
            response.send(err);
        }
    }
}

module.exports = new AccountController().router;

