const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

let data =[]
app.post("/api/todoapp",(req,res)=>{
    info= req.body;
    data.push(info);
    let todoarr = data
     res.send({success:true, data:todoarr,message:'data inserted successfully'})    
})

app.get('/getTodo/:eid',(req,res)=>{    
    const result =data.filter(r=>r.eid==req.params.eid);    
    res.send({success:true,data:result,message:'successfully find'})
})

app.put("/update/:eid",(req,res)=>{
    const result=data.findIndex(r=>r.eid==req.params.eid)
    if(data[result].eid === req.params.eid){
         data[result].ename = req.body.ename
         res.send(data)
    }
})
app.delete('/delete/:eid',(req,res)=>{            
             const result = data.findIndex(r=>r.eid=req.params.eid);
             if(result > -1 ){
                 data.splice(result,1)     
                res.send(data)
             }
})
app.listen(3000,()=>{
    console.log("server started..")
})