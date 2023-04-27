const express = require('express')

const { logReqRes } = require('./middlewares')
const { connectMongoDb } = require('./connection')
const userRouter = require('./routes/user')

const app = express()
const PORT = 8000

// CONNECTION

connectMongoDb('mongodb://127.0.0.1:27017/user_management').then(() => {
  console.log('mongodb connection established')
})

//MIDDLEWARE

app.use(express.urlencoded({ extended: false }))
app.use(logReqRes('log.txt'))

// ROUTES

app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`)
})
