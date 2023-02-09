import pg from "pg"
import express from "express"
import bodyParser from "body-parser"
import * as dotenv from "dotenv"
// import  Jwt  from "jsonwebtoken"
dotenv.config()

const client = new pg.Client({
    user: "postgres",
    host: "localhost",
    database:"locker_room",
    password: `${process.env.MYSQL_PASSWORD}`,
    port: 5432,
})
const app = express()
app.use(bodyParser.json())

const table = `
DROP TABLE IF EXISTS users; 
  CREATE SEQUENCE users_seq;
  CREATE TABLE users (
    id SERIAL NOT NULL,
    name VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
  );
    
  DROP TABLE IF EXISTS messages;
  CREATE SEQUENCE messages_seq;
  CREATE TABLE messages (
    id SERIAL NOT NULL,
    id_users INTEGER NOT NULL,
    id_lobbies INTEGER NOT NULL,
    content VARCHAR(1) NOT NULL,
    PRIMARY KEY (id)
  );
  
  DROP TABLE IF EXISTS lobbies;
  CREATE SEQUENCE lobbies_seq;
  CREATE TABLE lobbies (
    id SERIAL,
    id_users INTEGER NOT NULL,
    PRIMARY KEY (id)
  );
  
  DROP TABLE IF EXISTS users_per_lobby;
  CREATE SEQUENCE users_per_lobby_seq;
  CREATE TABLE users_per_lobby (
    id SERIAL,
    id_users INTEGER NOT NULL,
    id_lobbies INTEGER NOT NULL,
    PRIMARY KEY (id)
  );
  
  DROP TABLE IF EXISTS teams;
  CREATE SEQUENCE teams_seq;
  CREATE TABLE teams (
    id SERIAL,
    PRIMARY KEY (id)
  );
  
  DROP TABLE IF EXISTS users_per_team;
  CREATE SEQUENCE users_per_team_seq;
  CREATE TABLE users_per_team (
    id SERIAL,
    id_users INTEGER NOT NULL,
    id_teams INTEGER NOT NULL,
    PRIMARY KEY (id)
  );
    
  ALTER TABLE messages ADD FOREIGN KEY (id_users) REFERENCES users (id);
  ALTER TABLE messages ADD FOREIGN KEY (id_lobbies) REFERENCES lobbies (id);
  ALTER TABLE lobbies ADD FOREIGN KEY (id_users) REFERENCES users (id);
  ALTER TABLE users_per_lobby ADD FOREIGN KEY (id_users) REFERENCES users (id);
  ALTER TABLE users_per_lobby ADD FOREIGN KEY (id_lobbies) REFERENCES lobbies (id);
  ALTER TABLE users_per_team ADD FOREIGN KEY (id_users) REFERENCES users (id);
  ALTER TABLE users_per_team ADD FOREIGN KEY (id_teams) REFERENCES teams (id);
  `

client.query(table, (err, res) =>{
    if(err) {
        console.error(err)
        return
    }
    console.log("table created(bravo)")
})

client.connect()

app.listen(3000, () =>{
    console.log("Server running on port 3000")
})

