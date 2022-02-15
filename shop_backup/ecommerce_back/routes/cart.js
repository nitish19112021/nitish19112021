const router = require("express").Router();

const Cart = require("../models/Cart")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken} = require("./verifyToken")


//create cart
router.post("AddCart/",verifyToken,async (req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const saveCart = await newCart.save();
        res.status(200).json(saveCart)
    }catch(err){
        res.status(400).json(err)
    }
})
// update Cart

router.post("/UpdateCart/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{    
        
    const updateCart = await Cart.findByIdAndUpdate({_id:req.params.id},
        {$set:req.body},
        {new:true})
        res.status(200).json(updateCart)
    }catch(err){
        res.status(400).json(err)
    }
})


// delete Cart

router.delete('/deleteCart/:id', verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Product has been deleted"})
    }catch(err){
        res.status(400).json(err)
    }
})

//get User Cart
router.get("/getCart/:userId",verifyTokenAndAuthorization, async (req,res)=>{
    try{
       const cart = await Cart.find({userId: req.params.userId})
        
        res.status(200).json(cart)

    }catch(err){
        res.status(400).json(err)
    }
})


// get All Cart

router.get("/findAllProduct", verifyTokenAndAdmin, async (req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category
    try{        
        const carts  = await Cart.find()
        res.status(200).json(carts)
    }catch(err){
       res.status(400).json(err)
    }
})


module.exports = router 