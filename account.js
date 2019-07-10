const { findUser } = require('./databaseAccounts');
const auth = require('./auth');

async function verifyUser(username, pass) {
    try {
        const user = await findUser(username);
        return user.password === pass;
    } catch (err) {
        console.log(err);
    }
    return false;
}

async function login(username, pass) {
    const exists = await verifyUser(username, pass);
    if (exists) {
        let token = auth.sign(username)
        return {
            token: token,
            success: true,
            message: "Authentication successful"}
    } else {
        return {
            success: false,
            message: "Authentication failed"}
    } 
}

module.exports = {findUser, login};