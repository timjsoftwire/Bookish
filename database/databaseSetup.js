/*const pgPromise = require('pg-promise')();

const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'Bookish',
    user: 'Bookish',
    password: 'book1'
};

exports.database = pgPromise(cn);*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize('Bookish', 'Bookish', 'book1', { 
    host: 'localhost',
    dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const defaultOptions = {
  sequelize,
  createdAt: false,
  updatedAt: false,
}

const Model = Sequelize.Model;
class Member extends Model {}
Member.init({
  // attributes
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  balance: {
    type: Sequelize.NUMERIC(6,2),
    allowNull: false
  }

}, Object.assign({
  modelName: 'member',
  tableName: 'member',
}, defaultOptions));

class Author extends Model {}
Author.init({
  //attributes
  lname: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  fname: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
}, Object.assign({
  modelName: 'author',
  tableName: 'author'
}, defaultOptions));

class Book extends Model {}
Book.init({
  //attributes
  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  authorid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Author,
      key: 'id'
    }
  },
  isbn: {
    type: Sequelize.STRING(13),
    allowNull: false
  }

}, Object.assign({
  modelName: 'book',
  tableName: 'book'
}, defaultOptions));

class Entry extends Model {}
Entry.init({
  //attributes
  bookid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'id'
    }
  },
  label: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  edition: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, Object.assign({
  modelName: 'entry',
  tableName: 'entry'
}, defaultOptions));

class Loan extends Model {}
Loan.init({
  entryid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Entry,
      key: 'id'
    }
  },
  userid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: 'id'
    }
  },
  loandate: {
    type: Sequelize.RANGE(Sequelize.DATEONLY),
    allowNull: false
  }
},  Object.assign({
  modelName: 'loan',
  tableName: 'loan'
}, defaultOptions));

Book.belongsTo(Author, { foreignKey: "authorid"});
Author.hasMany(Book, {foreignKey: "authorid"});

Entry.belongsTo(Book, {foreignKey: 'bookid'});
Book.hasMany(Entry, {foreignKey: 'bookid'});

Loan.belongsTo(Entry, {foreignKey: 'entryid'});
Entry.hasMany(Loan, {foreignKey: 'entryid'});

Loan.belongsTo(Member, {foreignKey: 'userid'});
Member.hasMany(Loan, {foreignKey: 'userid'});

module.exports = {Member, Author, Book, Loan, Entry};