require('dotenv').config({path:'variaveis.env'});//cpnsdeguir ler o variaveis.env
const express = require('express');
const cors = require('cors')//poder trabalhar com api
const bodyParser = require('body-parser')//modulo capaz de converter o body para outros formatos

const routes = require('./routes')

const server = express()
server.use(express.json())
server.use(bodyParser.json())
server.use(cors())
server.use(bodyParser.urlencoded({extended:false}))

server.use('/api', routes)  

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`)
})