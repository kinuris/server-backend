import express from "express"
import expressWS from "express-ws"
import path from "path"

// adding-websocket branch

import { ifNameOnly } from "./custom_middleware/groups/ifNameOnly"

const appVanilla = express()
const expressWs = expressWS(appVanilla)
const app = expressWs.app 

app.use(express.static("static"))

app.ws('/websocket/', (ws, req) => {
    ws.on('message', data => {
        ws.send(`Hello There, From Server. Your Message Was: ${data.toString()}, And Your IP Is: ${req.headers["X-Real-IP"]}`)
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "sites", "index", "index.html"))
})

app.get('/:name/:directory?/:file?', ...ifNameOnly, (req, res) => {
    res.sendFile(path.join(__dirname, "sites", req.url))
})

app.listen(5500, () => {
    console.log("Server is listening of port 5500")
})
