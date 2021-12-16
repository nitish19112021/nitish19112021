const express = require("express")
const router = express.Router();
const multer = require("multer")
const upload = multer({dest:'uploads/'})
const productModel = require("../product/productModel")
const masterSchema = require("../product/mastermodel");
require('dotenv').config()
const mongoose = require("mongoose");
const { error } = require("winston");
const path = require("path")


//add product details
router.post("/addproduct",upload.single('productImage'),(req,res)=>{
    const product = new productModel({
        productName: req.body.productName,
        productQuantity:req.body.productQuantity,
        productPrice:req.body.productPrice,
        productDescription:req.body.productDescription,
        productImage:req.file.path
    })
    console.log(req.file.path)

    product.save((err,data)=>{
        if(err) {
            res.status(400).send("product not Added.")
        }else{
            res.status(200).json({data,message:"Product added Successfully"})
        }
    })

})
//get all product
router.post("/getAllProduct",async (req,res)=>{
    try{
        const product = await productModel.find();
        res.status(200).json({message:"All product detalis:",product})
    }
    catch(error){
        if(error) {
            res.status(400).json({message:"Not found"})
        }
    }
})
//update product
router.patch("/updateProduct/:_id",async (req,res)=>{
    console.log(req.params._id)
    const product = await productModel.findByIdAndUpdate(req.params._id,req.body)
    
    try{
        if(!product) throw console.error("error")
        res.status(200).json({message:"Product Updated.", product})
    }
    catch(error){
        if(error) {
            res.status(400).json({message:"Prouduct Not Updated."})
        }
    }
})

router.post("/addCategory", (req,res)=>{
    //const name = req.body.name;
    const productCategory = new masterSchema({
        nameCat:req.body.nameCat,
        subCategory: req.body.subCategory
    })
    
    masterSchema.findOne({nameCat:req.body.nameCat},(err,existingCat)=>{
        if(err) throw err;
        if(existingCat){
            res.status(400).json("product category is already exist")
        }else{
           productCategory.save()
            res.status(200).json({productCategory, message:"product saved."})
        }
    })
    
})

router.patch("/updateCategory/:_id", async (req,res)=>{
            masterSchema.findByIdAndUpdate({"_id":req.params._id},{"nameCat":req.body.nameCat},(err,data)=>{
                if(err){
                    res.json({err})
                }else{
                    console.log(data)
                    res.json({data})
                }
            })
    
            // masterSchema.findByIdAndUpdate(req.params._id,req.body,(err,data)=>{
            //     if(err) res.json(err);
            //     if(data){
            //         res.json({data,message:"category updated."})
            //     }else{
            //         res.json({message:"data not updated."})
            //     }
            // })
    
            // const product = await masterSchema.findByIdAndUpdate(req.params._id,req.body)    
            //     if(product) {
            //            res.json({message:"category updated."}) 
            //     }else{
            //         res.json({message:"Not updated"}) 
            //     }
            

        
        //update subcategory by select id
        // masterSchema.findOneAndUpdate(
        //     {"_id:" : req.params._id, "subCategory._id":'61b8603e3e4e8c31d2bf54a9'},
        //     {$set:{'subCategory.$.nameSubcat' : req.body.subCategory[0].nameSubcat}},
        //     (err,data) =>{
        //         if(err) throw err;
        //         res.status(200).json({data,message:"data updated"})
        //     }
        //     )
    
    
 })

router.post("/updateSubCategory/:_id", async (req,res)=>{
    console.log(req.body.subCategory[1]._id)
    
        
    masterSchema.findOneAndUpdate({

            "_id":req.params._id,
            "subCategory._id":req.body.subCategory[1]._id},

            {
                $set:{"subCategory.$.nameSubcat":req.body.subCategory[0].nameSubcat}
            }).then((data)=>{
               
                res.send(JSON.stringify({message:"subcat updated."}))
              
            }).catch((e)=>{
                
                res.send(JSON.stringify(e));
            })
//     const product = await masterSchema.findOneAndUpdate({
//     "_id":req.params._id,
//     "subCategory._id":req.body.subCategory[1]._id},
//     {$set:{"subCategory.$.nameSubcat":req.body.subCategory[0].nameSubcat}},
//     (err,data)=>{
//         if(err) return err
//         else{
//             return data
//         }
//     }
//     )
//     if(!product){
//         res.json({message:"subcat not updated."})
//     }
//     else{
//         res.json({product, message:"subcat updated"})
//     }
 })

module.exports = router