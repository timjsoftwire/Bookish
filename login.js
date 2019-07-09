async function verifyUser(req, res, database) {
    const user = req.query.user;
    const pass = req.query.password;
    try {
        const result = await database.many("select id from member where name = $1 and password = $2", [user, pass]);
       
        return true;
    } catch (err) {
        console.log(err);
        
    }
    return false;
}

module.exports = {verifyUser};