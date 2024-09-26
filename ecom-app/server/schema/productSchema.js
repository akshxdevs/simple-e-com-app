const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        trim:true
    },
    productDescription:{
        type:String,
        trim:true
    },
    productPrice:{
        type:Number,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    productImg:{
        type:String,
        trim:true
    },
    productRating:{
        type:Number,
        trim:true
    }
},{timestamps:true});

const Product = mongoose.model("Product",ProductSchema);
module.exports = Product;