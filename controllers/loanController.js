const { jwtAuth } = require ('../auth');
const { Router } = require('express');
const { getLoans } = require('../database/databaseLoans');

class LoanController {
    constructor() {
        this.router = Router();
        this.router.get('/', jwtAuth, this.getLoansRoute.bind(this));
    }
 
    async getLoansRoute(request, response) {
        const userid = request.user.id;
        try {
            const loans = await getLoans(userid);
            response.send(loans);
        } catch (err) {
            response.send(err);
        }
    }
}
 
module.exports = new LoanController().router;