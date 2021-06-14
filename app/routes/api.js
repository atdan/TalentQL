let express = require('express')

let userRouter = require('./user')
let postRouter = require('./post')

var app = express()

app.use("/user/", userRouter)
app.use("/post/", postRouter)

module.exports = app