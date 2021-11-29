const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chetu@123',
    database: 'todo'
})
con.connect((err) => {
    if (err) throw err;
    console.log('database connected..')
})

app.post('/api/todoapp', (req, res) => {
    try {
        let eid = req.body.eid;
        let ename = req.body.ename;
        let sql = `insert into todotable(eid, ename) values(?,?)`;
        con.query(sql, [eid, ename], (err) => {
            if (err) throw err;
            let sql1 = `select * from todotable`
            con.query(sql1, (err, result) => {
                if (err) throw err;
                res.send(result)
            })
        })

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.get('/api/todoapp/', (req, res) => {
    try {
        let eid = req.query.eid;
        let sql = `select * from todotable where eid = ?`        
        con.query(sql, [eid], (err, result) => {
            if (err) throw err;
            console.log('data find successfully.')
            res.send(result)
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

app.put('/api/todoapp/', (req, res) => {
    try {
        let eid = req.query.eid
        let ename = req.body.ename;
        let sql = `update todotable set ename = ? where eid = ?`;
        con.query(sql, [ename, eid], (err) => {
            if (err) throw err;
            let sql2 = `select * from todotable`;
            con.query(sql2, (err, result) => {
                if (err) throw err;
                res.send(result)
            })
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})
app.delete('/api/todoapp/', (req, res) => {
    try {
        let eid = req.query.eid;        
        let sql = `delete from todotable where eid = ${eid}`
        con.query(sql, (err) => {
            if (err)
                throw err;
            let sql3 = `select * from todotable`;
            con.query(sql3, (err, result) => {
                if (err)
                    throw err;
                res.send(result)
            });
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

app.listen(3000, () => {
    console.log("server created..")
})