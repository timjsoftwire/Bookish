const {Member, Author, Book, Loan, Entry} = require('./databaseSetup');

async function getLoans(userid) {

    let loans = Loan.findAll({
        where: {
            userid: userid
        },
        include: [{
            model: Entry,
            include: [{
                model: Book,
                include: [{
                    model: Author
                }]
            }]
        }]
    })

    loans = loans.map(element => {
        return {
            loanDate: element.loandate,
            label: element.entry.label,
            edition: element.entry.edition,
            title: element.entry.book.title,
            isbn: element.entry.book.isbn,
            lname: element.entry.book.author.lname,
            fname: element.entry.book.author.fname
        }
    })

    return loans;
}

module.exports = {getLoans};