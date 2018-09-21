const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/UserDB').then((doc) =>{
    console.log('success')
},(err) => {
    console.log('fail')
})

var Schema = mongoose.Schema

var UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required:true,
        minlength:6
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
     firstname:{
        type: String,
        required:true
     },
     lastname:{
        type: String,
        required:true
     },
     email:{
        type: String,
        required:true
     },
     sex:{
        type: Boolean
     },
     address:{
        type: String 
     }

     
})

var User = mongoose.model('User', UserSchema)

var app = express()
app.use(bodyParser.json())

app.get('/test',(req,res) => {
    res.send('hello')
}) 

app.post('/signup',(req,res) => {
    let newUser = new User ( {
        username:req.body.username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        sex:req.body.sex,
        address:req.body.address
    })
  newUser.save().then((doc) =>{
    res.send(doc)
  }, (err) => {
      res.status(400).send(err)

  })
})

app.get('/signin',(req,res) =>{
    let usernameInput = req.headers['username']
    let passwordInput = req.headers['password']

    User.find({
        username:usernameInput,
        password:passwordInput

    }).then((doc) =>{
        res.send(doc[0])
    },(err) =>{
        res.status(400).send(err)
    })
})

app.listen(3000,() => {
    console.log('listen on port 3000')
} )