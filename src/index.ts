import express from "express"
import expressWS from "express-ws"
import path from "path"
import pg from "pg"
import dotenv from "dotenv"
import { ifNameOnly } from "./custom_middleware/groups/ifNameOnly"

dotenv.config({path: __dirname + "/.env"})

const appVanilla = express()
const expressWs = expressWS(appVanilla)
const app = expressWs.app

app.use(express.static("static"))

const pgClient = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432
})

await pgClient.connect()

app.get('/fetch', async (req, res)=> {
    const result = await pgClient.query("SELECT * FROM menu")
    console.log(result)
    res.end()
})

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
