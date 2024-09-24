const { default: mongoose } = require("mongoose");

const LikedProductsSChema = new mongoose.Schema({
    likedProductName:{
        type:String,
        trim:true
    },
    likedProductDescription:{
        type:String,
        trim:true
    },
    likedProductPrice:{
        type:Number,
        trim:true
    },
    likedProductCategory:{
        type:String,
        trim:true
    },
    likedProductImg:{
        type:String,
        trim:true
    },
    userId:{
        type:String,
        trim:true,
        required:true,
    }
},{
    timestamps:true
});

const LikedProducts = mongoose.model("LikedProducts",LikedProductsSChema);
module.exports = LikedProducts;  