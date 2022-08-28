import express from "express"
import path from "path"
import { assertDirectoryThenFile } from "./custom_middleware/assertDirectoryThenFile"
import { nameOnlyRedirect } from "./custom_middleware/nameOnlyRedirect"

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "sites", "index", "index.html"))
})

app.get('/:name/:directory?/:file?', nameOnlyRedirect, assertDirectoryThenFile, (req, res) => {
    res.sendFile(path.join(__dirname, "sites", req.url))
})

app.listen(5500, () => {
    console.log("Server is listening of port 5500")
})