import express from "express"
import path from "path"

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "sites", "index", "index.html"))
})

app.listen(5500, () => {
    console.log("Server is listenening of port 5500")
})