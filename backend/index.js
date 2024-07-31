
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const auth = require('./router/auth')
const operations = require('./router/operations')

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',auth)
app.use('/',operations)

app.get('/', (req,res) => {
    res.send("Hello world")
})

app.listen(PORT,() => console.log(`the server is listenning on ${PORT}`))