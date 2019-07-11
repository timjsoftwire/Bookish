const { Member } = require('./databaseSetup');

async function findUser(user) {
    const answer = await Member.findOne({
        where: {
            name: user
        }
    })
    
    return answer;
}

async function registerUser(username, pass) {
    await Member.create( {
        name: username,
        password: pass,
        balance: 0.00
    })
}

module.exports = {findUser, registerUser};