const router = require("express").Router();
const Order = require("../models/Order")

const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken} = require("./verifyToken")
//Add order
router.post("addOrder/",verifyToken, async (req,res)=>{
    const newOrder = new Order(req.body)
    try{
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder)
    }catch(err){
        res.status(400).json(err)
    }
})
// update order

router.post("/updateOrder/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{    
        
    const updateOrder = await Order.findByIdAndUpdate({_id:req.params.id},
        {$set:req.body},
        {new:true})
        res.status(200).json(updateOrder)
    }catch(err){
        res.status(400).json(err)
    }
})


// delete Order

router.delete('/deleteCart/:id', verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Product has been deleted"})
    }catch(err){
        res.status(400).json(err)
    }
})

//get User Order
router.get("/getCart/:userId",verifyTokenAndAuthorization, async (req,res)=>{
    try{
       const orders = await Order.find({userId: req.params.userId})        
        res.status(200).json(orders)

    }catch(err){
        res.status(400).json(err)
    }
})

// get All Order

router.get("/findAllProduct", verifyTokenAndAdmin, async (req,res)=>{
    
    try{        
        const orders  = await Order.find()
        res.status(200).json(orders)
    }catch(err){
       res.status(400).json(err)
    }
})

module.exports = router 