const router = require("express").Router();
const Product = require("../models/Product")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

router.post("/addProduct",verifyTokenAndAdmin,async (req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct)
    }catch(err){
        res.status(400).json(err)
    }
})
// update product

router.post("/updateProduct/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{    
        
    const updateProduct = await Product.findByIdAndUpdate({_id:req.params.id},
        {$set:req.body},
        {new:true})
        res.status(200).json(updateProduct)
    }catch(err){
        res.status(400).json(err)
    }
})


// delete product

router.delete('/deleteProduct/:id', verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Product has been deleted"})
    }catch(err){
        res.status(400).json(err)
    }
})

//get Product
router.get("/findProduct/:id", async (req,res)=>{
    try{
       const product = await Product.findById(req.params.id)
        
        res.status(200).json(product)

    }catch(err){
        res.status(400).json(err)
    }
})


// get All product

router.get("/findAllProduct", async (req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category
    try{
        let products;
        if(qNew){
            products =  await Product.find().sort({createdAt: -1}).limit(1);
        }else if(qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory]
                }
            })
        }else{
            products = await Product.find()
        }
        res.status(200).json(products)

        // const product = await Product.find()
        // res.status(200).json(product )

    }catch(err){
        res.status(400).json(err)
    }
})


module.exports = router 