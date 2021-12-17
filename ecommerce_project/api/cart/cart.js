const express = require("express")
const User = require("../user/userModel")
const router = express.Router();
const auth = require("../../middleware/userAuth");
const { ObjectID } = require("bson");
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

// const productArray = [];


require("dotenv").config()

router.post("/addTocart/:id", (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      User.updateOne({ "_id": req.params.id },
       { $push: {'items': req.body._id} })
       .then(result=>{
        console.log("res",result);
        res.json({result,message:"Product Added."})
      })
    } else {
      console.log("User Not Exist");
      res.json({message:"product not Added."})
    }
  })
  // User.findOne({"_id":req.params.id})
  // .populate("items")
  // .exec().then(r=>{res.send(r)})
  // .catch(r=>{res.send("error"+r)})
})

router.post("/getCart/:id",(req,res)=>{
    User.findOne({"_id":req.params.id})
    .populate("items")
    .exec().then(result=>{
      res.json({result, message:"cart products"})
    }).catch(err=>{
      res.json("error"+err)
    })
})

router.post("/deleteCartProduct/:id",(req,res)=>{
  User.findById(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      User.updateOne({ "_id": req.params.id },  
      { items: { $elemMatch: {"items": req.body.id} } },
       { $set: {"items":""}})
       .then(result=>{
        // console.log("res",result);
        res.json({result,message:"Product deleted."})
      })
    } else {
      console.log("user Not Exist");
      res.json({message:"product not deleted."})
    }
  })


  // User.findById(req.params.id, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   if (result) {
  //     User.updateOne({ "_id": req.params.id },
  //      { $set: {'items': []} })
  //      .then(result=>{
  //       // console.log("res",result);
  //       res.json({result,message:"Product deleted."})
  //     })
  //   } else {
  //     console.log("User Not Exist");
  //     res.json({message:"product not deleted."})
  //   }
  // })


  // User.findOne({"_id":req.params.id},(err, result)=>{
  //   if(err){
  //     res.json(err)
  //   }
  //   else{
  //     User.Update({"items": req.body.items},{items:{$elemMatch:{"items": req.body.items}}},
  //     {$unset:{items:""}})
  //   }
  // })

    // User.findOneAndUpdate({ "_id": ObjectId("61bcbba7ed39602fcf0912ad"), }
  // , { items: { $elemMatch: {"items": ObjectId("61b9c49cbf4fef893191284a")} } }
  // , {$unset:{items: ""}})
  // .then(result=>{res.json("deleted")}).catch(err=>res.json("err"+err))


  // User.findOneAndUpdate({ "_id": req.params.id },
  //  { items: { $elemMatch: {"items[0]": req.body.items} } },
  //   {$unset:{items: ""}}).then(result=>{res.json({result,message:"delete"})}).catch(err=>{res.json("err"+err)})




})
  

// router.post("/addTocart/:id",async (req,res)=>{     

//     const user =await User.findOne({"_id":req.params.id},{"_id":1})
//     const product = await Product.find({"_id":{$in: req.body.id}})
//     .select({"_id":1,
//     "productName":1,
//     "productQuantity":1,
//     "productPrice":1,
//     "paid":1,
//     })
//     console.log(product)
//     const cartitem = new Cart({
//         userId:user,
//         Items:product
//     })
//     cartitem.save()
//     .then((result)=>{res.json(result)}).catch((err)=>{res.json(err)})

// })

//delete
// router.post("/deleteCartItem/:id",async (req,res)=>{      
//   const cart =await Cart.findOne({'userId': { _id: '61b9bf7f723d17b9a8b37ede'}})

// })

module.exports = router;