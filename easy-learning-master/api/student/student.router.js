var express = require('express');
const studentController = require('./student.controller.js');
const auth = require('../../middleware/authorization');
const router = express.Router();


//  Register the User
router.post('/register', (req,res,next)=>{
    const studentDetails = req.body;
    try{
    studentController.onRegister(studentDetails).then(result=>{
        return res.status(201).send(result);
    },err=>{
        console.log("ttt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});

// student login
router.post('/login', (req,res,next)=>{
    const loginDetails = req.body;
    try{
    studentController.onLogin(loginDetails).then(result=>{
        return res.status(200).send(result);
    },err=>{
        console.log("ttrrrt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});

// update Student info for modal
router.post('/updateStudent', (req,res,next)=>{
    const studentDetails = req.body;
    try{
    studentController.updateStudent(studentDetails).then(result=>{
        return res.status(200).send(result);
    },err=>{
        console.log("ttt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});

// update Student Profile 
router.post('/updateStudentProfile', (req,res,next)=>{
    const studentDetails = req.body;
    try{
    studentController.updateStudentProfile(studentDetails).then(result=>{
        return res.status(200).send(result);
    },err=>{
        console.log("ttt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});

// api to get user Details
router.post('/getStudentDetails',auth, (req,res,next)=>{
    const studentDetails = req.body;
    try{
    studentController.getStudentDetails(studentDetails).then(result=>{
        return res.status(200).send(result);
    },err=>{
        console.log("ttrrrt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});

// api to add subscription 
router.post('/addSubscription',auth, (req,res,next)=>{
    const subscriptionDetails = req.body;
    try{
    studentController.addSubscription(subscriptionDetails).then(result=>{
        return res.status(200).send(result);
    },err=>{
        console.log("ttt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});

// api to update subscription 
router.post('/updateSubscription', auth, (req,res,next)=>{
    const subscriptionDetails = req.body;
    try{
    studentController.updateSubscription(subscriptionDetails).then(result=>{
        return res.status(200).send(result);
    },err=>{
        console.log("ttt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});

// api to check subscription 
router.post('/subscriptionStatus', auth, (req,res,next)=>{
    const subscriptionDetails = req.body;
    try{
    studentController.subscriptionStatus(subscriptionDetails).then(result=>{
        return res.status(200).send(result);
    },err=>{
        console.log("ttt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});

// api to get subscribed teachers 
router.post('/getSubscriptions', auth, (req,res,next)=>{
    const subscriptionDetails = req.body;
    try{
    studentController.getSubscriptions(subscriptionDetails).then(result=>{
        return res.status(200).send(result);
    },err=>{
        console.log("ttt",err);
        return next(err)
    })
    }
    catch(err){
return next(err)
    }

});



module.exports = router;