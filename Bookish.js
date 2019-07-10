
const BookRoutes = require ('./bookController');
const LoanRoutes = require ('./loanController');
const AccountRoutes = require ('./accountController')

const express = require('express');


const app = express();
const expressPort = 3000;


app.listen(expressPort, () => console.log(`Example app listening on port ${expressPort}!`));

app.use('/books', BookRoutes);
app.use('/loans', LoanRoutes);
app.use('/account', AccountRoutes);