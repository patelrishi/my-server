var express = require('express')
var mongodb = require('mongodb')
var router = express.Router()

router.post('/student', async function(req,res,next){
    try{
        const data = req.body.data
        const MongoClient = mongodb.MongoClient
        const server = await MongoClient.connect('mongodb+srv://nit:nit@cluster0.26gts.mongodb.net/')
        const db = server.db('sms')
        const collection = db.collection('students')
        const result =await collection.insertOne(data)
        res.send(result)

    } catch(err){
        res.send(err.message)
    }
})

router.get('/get-student', async function(req,res,next){
    try{
    const MongoClient = mongodb.MongoClient
    const server = await MongoClient.connect('mongodb+srv://nit:nit@cluster0.26gts.mongodb.net/')
    const db = server.db('sms')
    const collection = db.collection('students')
    const data = await collection.find().toArray()
    res.send(data)

    } catch(err){
        res.send(err.message)
    }
})
//http://localhost:3030/std/students
module.exports = router;