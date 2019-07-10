
const BookRoutes = require ('./controllers/bookController');
const LoanRoutes = require ('./controllers/loanController');
const AccountRoutes = require ('./controllers/accountController')

const express = require('express');


const app = express();
const expressPort = 3000;


app.listen(expressPort, () => console.log(`Example app listening on port ${expressPort}!`));

app.use('/books', BookRoutes);
app.use('/loans', LoanRoutes);
app.use('/account', AccountRoutes);