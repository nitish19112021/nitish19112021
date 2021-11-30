var express = require('express');
const subjectCourseController = require('./subjectCourse.controller.js');
const router = express.Router();


//  add Subject Course
router.post('/addCourse', (req,res,next)=>{
    const courseDetails = req.body;
    try{
    subjectCourseController.addCourse(courseDetails).then(result=>{
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

// get Subject Course
// router.post('/getCourse', (req,res,next)=>{
//     const courseDetails = req.body;
//     try{
//     subjectCourseController.getCourse(courseDetails).then(result=>{
//         return res.status(200).send(result);
//     },err=>{
//         console.log("ttt",err);
//         return next(err)
//     })
//     }
//     catch(err){
// return next(err)
//     }

// });


module.exports = router;