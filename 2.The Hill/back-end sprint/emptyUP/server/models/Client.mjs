import pg from "pg"
import * as dotenv from "dotenv"
dotenv.config()

export const pool = new pg.Pool({
    user: "empty_up_db_admin",
    host: "localhost",
    database: "empty_up_db",
    password: "123456",
    port: 5432 ,
})



