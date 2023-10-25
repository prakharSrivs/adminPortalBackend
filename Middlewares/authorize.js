require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateJWT = (req,res,next) => {
    const token = req.headers.authorization;
    if(token)
    {
        jwt.verify(token,process.env.SECRET,(err,user)=>{
            if(err) return res.status(401).json({message:" Invalid Auth"})
            req.username=user.username;
            req.id=user.id;
            next();
        })
    }
    else {
        return res.sendStatus(401);
    }
}

module.exports = authenticateJWT;