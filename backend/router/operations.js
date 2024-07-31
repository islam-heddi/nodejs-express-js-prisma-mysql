const express = require('express')
const Router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

Router.get('/client/:id', async (req,res) => {
    const id = req.params.id
    try{

        const user = await prisma.client.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!user) return res.status(404).send("Client not found")

        res.send(JSON.stringify(user))

    }catch(err){
        res.status(500).send(`Error : ${err}`)
    }

})


Router.put('/client/:id', async (req,res) => {
    const {name, email,gender,date} = req.body;
    const { id } = req.params
    try{
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format. Expected ISO-8601 DateTime.');
        }
        const user = await prisma.client.update({
            where: {id: parseInt(id)},
            data:{
                name,
                email,
                date: parsedDate,
                gender
            }
        })

        if(!user) return res.status(404).send("user not found")

        res.send(user)
    }catch(err){
        res.status(500).send(`ERROR: ${err}`)
    }
})

Router.delete('/client/:id', async (req,res) => {
    const { id } = req.params
    try{
        const users = await prisma.client.delete({
            where: {id: parseInt(id)}
        })
        
        if(!users) return res.status(404).send("Operation failed due to delete unavaible user")

        res.send("user deleted successfully")
    }catch(err){
        res.status(500).send(`Unable to delete Error : ${err}`)
    }
})

module.exports = Router