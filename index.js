// import dotenv
require("dotenv").config()

// import express
const express = require("express")

// import cors
const cors = require("cors")

// import router
const router = require("./router")

// import connection
require("./db/connection")

// create server
const disasterManagementServer = express()

// tell server to use cors
disasterManagementServer.use(cors())

// parse
disasterManagementServer.use(express.json())

// tell server to use router
disasterManagementServer.use(router)

// create port
const PORT = 3000
disasterManagementServer.listen(PORT, ()=>{
    console.log(`Disaster ManagementServer started running successfully at port number : ${PORT}`);
    
})

// checking a get request
disasterManagementServer.get("/", (req, res)=>{
    res.status(200).json(`Disaster ManagementServer started running successfully`)
})

// disasterManagementServer.post("/", (req, res)=>{
//     res.status(200).json(`POST requset`);
    
// })