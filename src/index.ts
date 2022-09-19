import express from "express"
import expressWS from "express-ws"
import path from "path"
import pg from "pg"
import dotenv from "dotenv"
import { ifNameOnly } from "./custom_middleware/groups/ifNameOnly"

dotenv.config()

const appVanilla = express()
const expressWs = expressWS(appVanilla)
const app = expressWs.app

// To add dotenv support
console.log(process.env.DB_NAME)

const pgClient = new pg.Client({
    user: "chris",
    password: "chris",
    host: "localhost",
    port: 5432,
    database: "test_db"
})
pgClient.connect()
pgClient.query("SELECT * FROM food_menu").then(res => console.log(res.rows))

app.use(express.static("static"))

app.ws('/websocket/', (ws, req) => {
    ws.on('message', data => {
        ws.send(`Hello There, From Server. Your Message Was: ${data.toString()}, And Your IP Is: ${req.headers["x-real-ip"]}`)
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "sites", "index", "index.html"))
})

app.get('/:name/:directory_or_file?/:file?', ...ifNameOnly, (req, res) => {
    res.sendFile(path.join(__dirname, "sites", req.url))
})

app.listen(5500, () => {
    console.log("Server is listening of port 5500")
})
