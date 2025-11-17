var express = require('express')
var mongodb = require('mongodb')
var ObjectId = mongodb.ObjectId  // we can get the method from mongoDB it is used to convert the normal id is to ObjectId
var jwt = require('jsonwebtoken')
var router = express.Router()
var validateToken = require('./common/validateToken')

router.post('/student',validateToken , async function (req, res, next) {
    try {
        const data = req.body.data
        const MongoClient = mongodb.MongoClient
        const server = await MongoClient.connect('mongodb+srv://nit:nit@cluster0.26gts.mongodb.net/')
        const db = server.db('sms')
        const collection = db.collection('students')
        const result = await collection.insertOne(data) // we stored the data in mongoDb
        res.send(result)

    } catch (err) {
        res.send(err.message)
    }
})

router.get('/get-student',validateToken, async function (req, res, next) {
    try {
        const MongoClient = mongodb.MongoClient
        const server = await MongoClient.connect('mongodb+srv://nit:nit@cluster0.26gts.mongodb.net/')
        const db = server.db('sms')
        const collection = db.collection('students')
        const data = await collection.find().toArray() // we can get the data from mongoDb
        res.send(data)

    } catch (err) {
        res.send(err.message)
    }
})
router.put('/update-student', validateToken , async function (req, res, next) {
    try {
        const id = req.query.id      //id means we choose the id (which stud data modify that stud id)
        const data = req.body.data    //data means above choosed id data changed through Reqestbody 
        const MongoClient = mongodb.MongoClient
        const server = await MongoClient.connect('mongodb+srv://nit:nit@cluster0.26gts.mongodb.net/')
        const db = server.db('sms')
        const collection = db.collection('students')
        const result = await collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data })
        res.send(result)        // we can update or madify the data from mongoDb 
        //createFromHexString() means it is converted normal id to ObjectId
    } catch (err) {
        res.send(err.message)
    }
})

router.delete('/delete-student/:id', validateToken ,async function (req, res, next) {
    try {
        const id = req.params.id
        const MongoClient = mongodb.MongoClient
        const server = await MongoClient.connect('mongodb+srv://nit:nit@cluster0.26gts.mongodb.net/')
        const db = server.db('sms')
        const collection = db.collection('students')
        const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
        res.send(result)           //which id choosen that student data Deleted
    } catch (err) {
        res.send(err.message)

    }
})

router.post('/login', function (req, res, next) {
    try {
        const { uid, pswd } = req.body;
        if (uid === 'vamshi' && pswd === 'vamshi') {
            const token = jwt.sign({ uid, pswd }, "appToken") //appToken is variable whatever token created that token stored in this variable
            res.send([{ uid, pswd, token }])
        } else {
            res.send([])
        }
    } catch (err) {
        console.error(err.message)
    }
})

//http://localhost:3030/std/students
module.exports = router;