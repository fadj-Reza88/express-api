const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 1997

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Reza',
    password: 'abc123',
    database: 'tokoberkah',
    port: 3306,
    timezone: 'UTC'
})


app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome To Our API</h1>')
})

app.get('/getkota', (req,res) => {
    var nama = req.query.nama ? req.query.nama : '' // one line if == condition ? if true : if false 
    
var sql = `SELECT * FROM kota WHERE nama LIKE '%${nama}%';`
    db.query(sql, (err,results) => {
        if(err) {
            // console.log(err)
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })    
})

app.get('/getkota/:id', (req,res) => {    
var sql = `SELECT * FROM kota WHERE id=${req.params.id};`
    db.query(sql, (err,results) => {
        if(err) {
            // console.log(err)
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })    
})


app.get('/gettoko', (req,res) => {
    var nama = req.query.nama ? req.query.nama : '' // one line if == condition ? if true : if false 
    
var sql = `SELECT * FROM toko ;`
    db.query(sql, (err,results) => {
        if(err) {
            // console.log(err)
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })    
})

app.get('/gettoko', (req,res) => {    
    var nama = req.query.nama ? req.query.nama : ''
    var alamat = req.query.alamat ? req.query.alamat : ''

    console.log(req.query, d.getFullYear());

var sql = `SELECT * FROM toko
                WHERE nama LIKE '%${nama}%'
                AND alamat LIKE '%${alamat}%'`;
    
if(req.query.incmin){
    sql += ` AND totalIncome >= ${req.query.incmin}`
}
if(req.query.incmax){
    sql += ` AND totalIncome <= ${req.query.incmax}`
}
if(req.query.datefrom){
    sql += ` AND tanggalBerdiri >= ${req.query.datefrom}`
}
if(req.query.dateto){
    sql += ` AND tanggalBerdiri <= ${req.query.dateto}`
}
if(req.query.kotaId){
    sql += ` AND kotaId = ${req.query.kotaId}`
}

db.query(sql, (err,results) => {
    if(err) {
        // console.log(err)
        return res.status(500).send(err)
    }
    console.log(results)
    res.status(200).send(results)
})    
})


//===== cara akses ===  getkota/123/test/halo/bebas  ====
// app.get('/getkota/:idu/test/halo/:hello', (req,res) => {
//     console.log(req.params)
//     res.status(200).send('<h1>halo bro</h1>')
// })


app.listen(port, () => console.log(`API aktif di port ${port}`))
