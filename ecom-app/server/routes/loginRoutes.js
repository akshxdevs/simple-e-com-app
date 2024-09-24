require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");


const UserRouter = express.Router();
const SECRET = process.env.SECRET;

UserRouter.post("/", async(req,res) => {
    try {
        const {email,password} = req.body;
        if (!email || !password) {
            res.status(400).json({message:"All fields are required!"});
        }
        const user = await User.findOne({email});
        if (!user) {
           return res.status(400).json({message:"User not found!"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({message:"password mismatch!"});
        }
        const Token = jwt.sign(
            {
                email: user.email,
                _id:user._id,
            },SECRET,
            {expiresIn : '1h'}
        );
        res.status(200).json(
            {
                message:"LOGIN SUCESSFULL..",
                Token,
                user:{
                    name:user.username,
                    email:user.email,
                    id:user._id,
                },
            });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: "Internal server error" });    
    }
})

module.exports = UserRouter;