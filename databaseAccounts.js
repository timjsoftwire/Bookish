const {database} = require('./databaseSetup');

async function findUser(user) {
    const answer = await database.one("select * from member where name = $1", user);
    return answer;
}

module.exports = {findUser};