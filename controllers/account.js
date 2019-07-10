const { findUser, registerUser } = require('../database/databaseAccounts');
const auth = require('../auth');

async function verifyUser(username, pass) {
    try {
        const user = await findUser(username);
        if (!user) return false;
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

async function register(username, pass) {
    // Check the user doesn't already exist.
    const user = await findUser(username);
    if (!user) {
        await registerUser(username, pass);
        const token = await login(username, pass);
        return token;
    } else {
        return {success: false, message: "This user already exists!"};
    }
}

module.exports = {verifyUser, login, register};