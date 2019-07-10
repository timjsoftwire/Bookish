async function verifyUser(req, res, database) {
    const username = req.query.user;
    const pass = req.query.password;
    try {
        const user = await findUser(username, database);
        return user.password === pass;
    } catch (err) {
        console.log(err);
        
    }
    return false;
}

async function findUser(user, database) {
    const answer = await database.one("select * from member where name = $1", user);
    return answer;
}


module.exports = {verifyUser, findUser };