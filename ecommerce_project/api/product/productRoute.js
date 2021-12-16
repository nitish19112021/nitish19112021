// const express = require("express")
// const router = express.Router();
// const multer = require("multer")
// const upload = multer({dest:'uploads/'})

// require('dotenv').config()
// const productModel = require("./productModel")
// router.post("/addproduct",upload.single('productImage'),(req,res)=>{
//     const product = new productModel({
//         productName: req.body.productName,
//         productQuantity:req.body.productQuantity,
//         productPrice:req.body.productPrice,
//         productDescription:req.body.productDescription,
//         productImage:req.file.path
//     })
//     console.log(req.file.path)

//     product.save((err,data)=>{
//         if(err) {
//             res.status(400).send("product not Added.")
//         }else{
//             res.status(200).json({data,message:"Product added Successfully"})
//         }
//     })

// })



// module.exports = router