const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next)  {
    // console.log('inside verify token')
    if(!req.headers.authorization ){
        return res.status(401).send("No token passed")
    }

    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send("Extracted Token is Null")
    }
    let payload = jwt.verify(token, process.env.JWT_SECRET)
    if (!payload){
        // console.log(payload)
        return res.status(401).send("Unauthorized request")
    }
    // console.log(payload);
    req.userId = payload._id
    next()  

}

module.exports = verifyToken;