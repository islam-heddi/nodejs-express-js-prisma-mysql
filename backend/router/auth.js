const express = require('express')
const Router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const {hash, compare} = require('bcrypt')

Router.post('/login',async (req,res) => {
    const {password, email} = req.body
    try{
        const user = await prisma.client.findMany({
            where: {email: email}
        })

        if(!user) return res.status(404).send("email not found")

        const hashedpassword = user[0].password

        const check = await compare(password,hashedpassword)
        if(check){
            res.send("Logged in")
        }else{
            res.send("Passsword does not match")
        }

    }catch(err){
        res.status(500).send(`internal server error: ${err}`)
    }
})


Router.post('/register', async (req,res) => {
    let { name , email , password, date , gender } = req.body
    
    try{
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format. Expected ISO-8601 DateTime.');
        }
        password = await hash(password,10)

        const clients = await prisma.client.create({
            data : {
                name,
                password,
                email,
                gender,
                date: parsedDate
            }
        })

        res.json(clients)
    }catch( err ){
        res.status(500).send(`Error while creating new client <br>Error details : <br> ${err}`)
    }
    

})



module.exports = Router