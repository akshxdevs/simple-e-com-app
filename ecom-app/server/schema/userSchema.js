const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    address:{
        type: String,
        trim: true, 
    },
    phoneNo:{
        type: Number,
        trim: true,
    }
},{
    timestamps:true
})

const User = mongoose.model("User",UserSchema);
module.exports = User;