const express = require('express')
require('dotenv').config()
const APP_PORT = process.env.APP_PORT

const {verifyToken}=require('.//midalwaer/auth')
const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const app = express()
app.use(express.json())

app.use('/auth',authRouter)
app.use('/posts',verifyToken,userRouter)
app.use(function(req, res){
    res.send(404);
});
app.listen(APP_PORT);