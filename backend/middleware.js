const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware (req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];
    try{
    const decoded = jwt.verify(token,JWT_SECRET);
    req.userId = decoded.userId;
        next();
    }catch(err){
        console.log(err);
        res.status(403).json({
            message:"not authorized"
        })
    }   
};

module.exports={
    authMiddleware
}