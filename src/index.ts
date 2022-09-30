import "reflect-metadata"
import express from "express"
import expressWS from "express-ws"
import path from "path"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cors from "cors"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { ifNameOnly } from "./custom_middleware/groups/ifNameOnly"
import { validateSignup } from "./custom_middleware/validateSignup"
import { parseAuth } from "./custom_middleware/parseAuth"
import { lockName } from "./custom_middleware/lockName"
import { validateLogin } from "./custom_middleware/validateLogin"
import { lockNameReversed } from "./custom_middleware/lockNameReversed"
import { browserRouting } from "./custom_middleware/browserRouting"
import { statusIfNotVerified } from "./custom_middleware/statusIfNotVerified"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Food } from "./entity/Food"
import { FoodResolver } from "./resolvers/FoodResolver"
import { UserResolver } from "./resolvers/UserResolver"

dotenv.config({ path: __dirname + "/.env" })

const appVanilla = express()
const expressWs = expressWS(appVanilla)
const app = expressWs.app

app.use(express.static("static"))
app.use(express.json())
app.use(cors())

await new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [User, Food],
    subscribers: [],
    migrations: []
}).initialize()

const schema = await buildSchema({
    resolvers: [FoodResolver, UserResolver]
})
app.use(parseAuth)

app.post('/signup', validateSignup, async (req, res) => {
    const user = new User()

    user.password = await bcrypt.hash(req.body["password"], await bcrypt.genSalt(10))
    user.username = req.body["username"]
    user.email = req.body["email"]
    user.admin = false
    user.profileImageLink = req.body["profile_img_link"] ? req.body["profile_img_link"] : ""

    const duplicateEmail = await User.findOne({
        where: {
            email: user.email
        }
    })

    const duplicateUsername = await User.findOne({
        where: {
            username: user.username
        }
    })

    if (duplicateEmail) {
        res.status(401).send("User With That Email Already Exists").end()
        return
    } else if (duplicateUsername) {
        res.status(401).send("User With That Username Already Exists").end()
        return
    }

    try {
        await user.save()
    } catch {
        res.status(500).end()
        return
    }

    res.status(200).end()
})

app.post('/login', validateLogin, async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body["email"]
        }
    })

    if(!user) {
        res.status(401).send("Wrong email or password").end()
        return
    }
    
    if(await bcrypt.compare(req.body["password"], user.password)) {
        const authToken = jwt.sign({
            id: user.userID,
        }, process.env.SECRET, {
            expiresIn: 3600
        })

        res.setHeader("Set-Cookie", `auth_token=${authToken}`)
        res.status(200).send("Login successful").end()
    } else {
        res.status(401).send("Wrong email or password").end()
    }
})

app.post('/create-item', async (req, res) => {
    try {
        const food = new Food()
        food.name = req.body["name"]
        food.price = req.body["price"]
        food.imageLink = ""

        await food.save()
    } catch (error) {
        res.status(400).send(error.toString()).end()
    }

    res.status(200).end()
})

app.post('/clear-all', (_, res) => {
    res.clearCookie("auth_token")
    res.end()
})

app.get('/fetch', statusIfNotVerified(403), async (req, res) => {
    const result = await Food.find()

    res.json({ data: result })
})

app.ws('/websocket/', (ws, req) => {
    ws.on('message', data => {
        ws.send(`Hello There, From Server. Your Message Was: ${data.toString()}, And Your IP Is: ${req.headers["x-real-ip"]}`)
    })
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "sites", "index", "index.html")))

app.get('/:name/:directory_or_file?/:file?', 
lockName("register-item", "/login", { alertMessage: "You are logged out" }),
lockNameReversed("login", "/register-item", { alertMessage: "You are already logged in" }),
lockNameReversed("signup", "/register-item", { alertMessage: "Must logout first"}),
browserRouting("cookie-bite", {
    "/login": {
        redirect: "/cookie-bite/",
        onFail: false
    },
    "/signup": {
        redirect: "/cookie-bite/",
        onFail: false
    }
}),
 ...ifNameOnly, (req, res) => {
    res.sendFile(path.join(__dirname, "sites", req.url))
})

const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
        req,
    })
})

await server.start()
server.applyMiddleware({ app, path: '/api' })

app.listen({ port: 5500 }, () => {
    console.log("Server is listening of port 5500")
})
