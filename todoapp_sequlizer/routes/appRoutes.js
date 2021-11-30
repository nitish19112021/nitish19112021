//Third party modules: express,sequelize, sequelize-cli, mysql2

const express = require('express')
const router = express.Router();
const db = require('../models')
router.get('/all/', (req, res) => {
    //  res.send('hello')
    db.Todo.findAll().then(todos => res.send(todos))
})

//post request

router.post('/insertTodo', (req, res) => {
    db.Todo.create({
        text: req.body.text
    }).then(submittedTodo => res.status(200).send({ status: true, submittedTodo, message: "Record inserted successfully" }))
})


//get request by particular id

router.get('/findTodo/:id', (req, res) => {
    db.Todo.findAll({
        where: { id: req.params.id }
    }).then(todo => {
        if (todo.length === 0) {
            res.send({ status: false, message: "Record Not Found" })
        }
        else {
            res.status(200).send({ status: true, todo, message: "Record Found successfully" })
        }
    })

})

router.delete('/deleteTodo/:id',(req,res)=>{
    db.Todo.destroy({
        where:{
            id:req.params.id
        }
    }).then(todo=> {
        if(todo === 1){
            res.send({status:true,todo,message:"record deleted successfully"})
        }
        else{
            res.send({status:false,message:`${req.params.id} Particular id Record is already deleted...`})
        }
    }
    )
})

router.put('/updateTodo/',(req,res)=>{
    db.Todo.update({
        text:req.body.text
    },{
        where:{
            id:req.body.id
        }
    }).then(()=> res.send('success'))
})

module.exports = router;