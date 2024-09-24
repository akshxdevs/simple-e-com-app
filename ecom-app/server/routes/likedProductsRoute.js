const express = require("express");
const LikedProducts = require("../schema/likedProductsSchema");
const User = require("../schema/userSchema");

const likedProductRouter = express.Router();


likedProductRouter.get("/:userid",async(req,res)=>{
    try {
        const userId = req.params.userid;
        const checkUserId = await User.findOne({_id:userId});
        if (!checkUserId) {
            return res.status(400).json({message:"No user found"})
        }
        const getAllLikedProducts = await LikedProducts.find({userId});
        res.status(200).json(getAllLikedProducts);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
    }
})


likedProductRouter.post("/",async(req,res)=>{
    try {
        const {
            likedProductName,
            likedProductDescription,
            likedProductPrice,
            likedProductCategory,
            likedProductImg,
            userId
        } = req.body 
        const addNewLIkedProducts = await LikedProducts.create({
            likedProductName,
            likedProductDescription,
            likedProductPrice,
            likedProductCategory,
            likedProductImg,
            userId
        });
        res.status(200).json({
            message:"ADDED TO LIKED LIST SUCESSFULLY!",
            product: addNewLIkedProducts
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
    }
})

likedProductRouter.delete("/:likedproductid",async(req,res)=>{
    try {
        const likedProductId = req.params.likedproductid;
        const deleteLikedProduct  = await LikedProducts.deleteOne({_id:likedProductId});
        if (deleteLikedProduct.deletedCount > 0) {
            return res.status(200).json({message:"DELETED SUCESSFULLY."})
        }
        res.status(403).json({error:"Error occured!"})

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = likedProductRouter;