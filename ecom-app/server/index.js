const express = require("express");
const app = express()
const cors = require("cors");
const { db } = require("./db/ds");
require('dotenv').config();
const Port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const productRoutes = require("./routes/productRoutes")
const likedProductsRoutes = require("./routes/likedProductsRoute"); 
app.use("/signup",signupRoutes);
app.use("/login",loginRoutes);
app.use("/products",productRoutes);
app.use("/likedproducts",likedProductsRoutes);
async function startServer() {
    try {
        await db;
        app.listen(Port,()=>{
            console.log(`Server running on port ${Port}`);
        })
    } catch (error) {
        console.error("ERROR: Server connection failed",error);
        
    }
}

startServer();

