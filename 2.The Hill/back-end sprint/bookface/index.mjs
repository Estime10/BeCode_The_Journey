// import bodyParser from "body-parser"
// import  Jwt  from "jsonwebtoken"
import pg from "pg"
import express, { request, response } from "express"
import * as dotenv from "dotenv"
dotenv.config()

const client = new pg.Client({
    user: "postgres",
    host: "localhost",
    database:"locker_room",
    password: `${process.env.MYSQL_PASSWORD}`,
    port: 5432,
})


client.connect()
const server = express()

server.use(express.static("public"))
server.use(express.json())

server.get("/suscribe", (req, res) =>{
    const { dynamic } = req.params
    const { key } = req.query
    console.log(dynamic, key)
    res.status(200).json({message:'suscribed!'})
})

 server.post("/", (req, res) =>{
    const { parcel } = req.body
    console.log(parcel)
   
    if (!parcel) {
     return res.status(400).send({status: "failed"})
   }
    res.status(200).send({status: "logged in!"}) })




// Overview
server.get("/LockerRoom", (req, response) =>{
    client.connect((err) =>{
    if(err) {
        console.error("connection error", err.stack)
    } else {
        
    }
})

client.query("SELECT * FROM users" , (err, res) => {
    if(err) throw err
    console.log(res)
    response.send({response: res})
        console.log("connected to BD")
        client.end()
})
})

// Create User
server.post("/LockerRoom/CreateUser", (req, response)=>{
    const { name,lastname, email, password } = req.body
    client.query
    ("INSERT INTO users (name, lastname, email, password) VALUES ( $1 ,$2, $3, $4) RETURNING *", 
    [name, lastname, email, password]),
    (error, results) =>{
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
    
})

// Get User Id 
server.get("/LockerRoom/:id", (request, response) =>{
    const id = parseInt(request.params.id)

    client.query("SELECT * FROM users WHERE id = $1", [id], (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
} )

// Update User by ID 
server.put ("/LockerRoom/:id", (request, response) =>{
    const id = parseInt(request.params.id)
    const { name, lastname, email, password } = request.body

    client.query(
    "UPDATE users SET name = $2, lastname = $3, email = $4, password = $5 WHERE id = $1",
    [ id, name, lastname, email, password, ],
    (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
})

// Delete User
server.delete("/LockerRoom/:id", (request, response) =>{
    const id = parseInt(request.params.id)
    client.query("DELETE FROM users WHERE id = $1", [id], (error, results) =>{
        if(error) {
            throw error
        }
        response.status(200).send(`user deleted with ID: ${id}`)
    })
})






server.listen(3000, () =>{
    console.log("Server running on port 3000")
})