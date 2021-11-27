var express = require('express');

var router = express.Router();
let data = []

router.post("/", (req, res) => {
    try {
        info = req.body;
        data.push(info);
        let todoarr = data
        res.send({
            success: true,
            data: todoarr,
            message: 'data inserted successfully'
        })
    } catch (error) {
        res.send({ error });
    }
})

router.get('/:eid', (req, res) => {
    try {
        const result = data.filter(r => r.eid === req.params.eid);
        console.log(result)
        res.send({ success: true, data: result, message: 'successfully find' })
    } catch (error) {
        res.send({ error })
    }

})

router.put("/:eid", (req, res) => {
    try {
        const result = data.find(r => r.eid === req.params.eid)
        // console.log(req.params.eid)
        // console.log(result.eid)
        // for(let x in data){
        //     console.log(data[x].eid)
        // }
        if (result.eid === req.params.eid) {
            // console.log(result.ename)
            // console.log(req.body.ename)
            result.ename = req.body.ename;
            res.send(data)
        }
    } catch (error) {
        res.send(error)
    }

})


router.delete('/:eid', (req, res) => {
    try {
        const result = data.findIndex(r => r.eid = req.params.eid);
        if (result > -1) {
            data.splice(result, 1)
            res.send(data)
        }
    } catch (error) {
        res.send(error)
    }

})

module.exports = router;
