const {database} = require('./databaseSetup');

async function findUser(user) {
    const answer = await database.oneOrNone("select * from member where name = $1", user);
    return answer;
}

async function registerUser(username, pass) {
    await database.query("insert into member (name, password, balance) values ($1, $2, 0)", [username, pass]);
}

module.exports = {findUser, registerUser};