import express from "express"
import expressWS from "express-ws"
import path from "path"
import pg from "pg"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { ifNameOnly } from "./custom_middleware/groups/ifNameOnly"
import { validateSignup } from "./custom_middleware/validateSignup"

dotenv.config({ path: __dirname + "/.env" })

const appVanilla = express()
const expressWs = expressWS(appVanilla)
const app = expressWs.app

app.use(express.static("static"))
app.use(express.json())

const pgClient = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432
})

await pgClient.connect()

// Change table when deploying to "menu"
const currentTable = "food_menu"

app.post('/signup', validateSignup, async (req, res) => {
    const username = req.body["username"]
    const email = req.body["email"]
    const password = await bcrypt.hash(req.body["password"], await bcrypt.genSalt(10));

    const user = await pgClient.query(`SELECT email FROM users WHERE email = '${email}'`)
    if (user.rowCount !== 0) {
        res.status(401).send("User Already Exists").end()
        return
    }
    
    try {
        await pgClient.query(`INSERT INTO users (email, password, username, admin, profile_img_link) VALUES ('${email}', '${password}', '${username}', false, '')`)
    } catch {
        res.status(500).end()
    }

    res.status(200).end()
})

app.post('/login', async (req, res) => {
    const user = await pgClient.query(`SELECT user_id, email, password FROM users WHERE email = '${req.body["email"]}'`)
    if(user.rowCount === 0) {
        res.status(401).send("Wrong email or password").end()
        return
    }
    const result = await bcrypt.compare(req.body["password"], user.rows[0]["password"])
    
    if(result) {
        res.status(200).send("Login successful").end()
    } else
        res.status(401).send("Wrong email or password").end()
})

app.post('/create-item', async (req, res) => {
    try {
        await pgClient.query(`INSERT INTO ${currentTable} (name, price) VALUES ('${req.body["name"]}', ${req.body["price"]})`)
    } catch {
        res.status(400).end()
    }

    res.status(200).end()
})

app.post('/delete-item', async (req, res) => {
    try {
        await pgClient.query(`DELETE FROM ${currentTable} WHERE name = '${req.body["name"]}'`)
    } catch {
        res.status(400).end()
    }
    
    res.status(200).end()
})

app.get('/clear-all', (_, res) => {
    res.setHeader("Set-Cookie", "token=")
    res.end()
})

app.get('/fetch', async (req, res) => {
    const result = await pgClient.query(`SELECT * FROM ${currentTable}`)

    res.setHeader("Set-Cookie", "token=DHFIOSAERJ(*e9r8203j4o2k3")
    res.json({ data: result.rows })
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
