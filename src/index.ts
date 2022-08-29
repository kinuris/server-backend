import express from "express"
import path from "path"

import { ifNameOnly } from "./custom_middleware/groups/ifNameOnly"

const app = express()

app.use(express.static("static"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "sites", "index", "index.html"))
})

app.get('/:name/:directory?/:file?', ...ifNameOnly, (req, res) => {
    res.sendFile(path.join(__dirname, "sites", req.url))
})

app.listen(5500, () => {
    console.log("Server is listening of port 5500")
})