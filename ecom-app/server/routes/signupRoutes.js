require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");

const UserRouter = express.Router();
const SECRET = process.env.SECRET;

UserRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);


    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ username: newUser.username, id: newUser._id, token });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

module.exports = UserRouter;
