const express = require("express");
const Product = require("../schema/productSchema");
const productRouter = express.Router();


productRouter.get("/",async(req,res)=>{
    try {
        const getAllProducts = await Product.find();
        if (!getAllProducts) {
            return res.status(400).json({message:"No product found!"})
        }
        res.status(200).json(getAllProducts);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
      }
});

productRouter.post("/",async (req,res)=>{
    try {
        const {
            productName,
            productDescription,
            productPrice,
            category,
            productImg
        } = req.body

        const addNewProduct = await Product.create({
            productName,
            productDescription,
            productPrice,
            category,
            productImg
        })
        res.status(200).json({
            message:"CREATED SUCESSFULLY!",
            product: addNewProduct
        });

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
      }
});

productRouter.delete("/:productid",async(req,res)=>{
    try {
      const productId = req.params.productid;
      const deleteProduct = await Product.deleteOne({_id:productId});
      if (deleteProduct.deletedCount > 1) {
        return res.status(200).json({message:"DELETED SUCESSFULLY."});
    }
    res.status(403).json({error:"Error occured!"});
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
      }
})

module.exports = productRouter;