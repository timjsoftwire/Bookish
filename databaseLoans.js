const {database} = require('./databaseSetup');

async function getLoans(userid) {
    // I'm sorry.
    const selects = "select LOWER(loandate) as lentDate, UPPER(loandate) as dueDate, label, edition, title, isbn, fname, lname";
    const tables = " from ((loan join entry on loan.entryid = entry.id) join book on entry.bookid = book.id) join author on book.authorid = author.id";
    const query = selects + tables + " where userid = $1";
    const loans = await database.any(query, userid);
    return loans;
}

module.exports = {getLoans};