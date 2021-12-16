const express = require("express")
const User = require("../user/userModel")
const Product = require("../product/productModel")
const router = express.Router();
const jwt = require('jsonwebtoken')
const auth = require("../../middleware/userAuth")
const Cart = require("./cart.model");
const { ObjectId } = require("mongodb");
const { Mongoose } = require("mongoose");
// const productArray = [];


require("dotenv").config()
router.post("/addTocart/:id",async (req,res)=>{     
    
    const user =await User.findOne({"_id":req.params.id},{"_id":1})
    const product = await Product.find({"_id":{$in: req.body.id}})
    .select({"_id":1,
    "productName":1,
    "productQuantity":1,
    "productPrice":1,
    "paid":1,
    })
    console.log(product)
    const cartitem = new Cart({
        userId:user,
        Items:product
    })
    cartitem.save()
    .then((result)=>{res.json(result)}).catch((err)=>{res.json(err)})

})

//delete
router.post("/deleteCartItem/:id",async (req,res)=>{      
  const cart =await Cart.findByIdAndDelete({"_id": ObjectId("61bb115c30e4905fc4d8baf3")})
  console.log(cart)
})

module.exports = router;