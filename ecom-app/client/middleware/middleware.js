const jwt = require("jsonwebtoken");
require("dotenv").config;

const SCERET = process.env.SCERET;

function verifyToken(req,res,next) {
    const token = req.headers["authorization"]?.split(" ")[1]; ;
    if (!token) {
        return res.status(401).json({message: "Access Denied. No token provided"});
    }
    try {
        const decoded = jwt.verify(token,SCERET);
        req.token = decoded;
        next();
    } catch (error) {
        res.status(403).json({message:"No valid Token"})
    }
}

module.exports = {verifyToken,SCERET};

