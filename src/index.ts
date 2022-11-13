import "reflect-metadata"
import express from "express"
import expressWS from "express-ws"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { ifNameOnly } from "./custom_middleware/groups/ifNameOnly"
import { parseAuth } from "./custom_middleware/parseAuth"
import { browserRouting } from "./custom_middleware/browserRouting"
import { statusIfNotVerified } from "./custom_middleware/statusIfNotVerified"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Food } from "./entity/Food"
import { FoodResolver } from "./resolvers/FoodResolver"
import { UserResolver } from "./resolvers/UserResolver"
import { FoodVariants } from "./entity/FoodVariants"
import { FoodVariantsResolver } from "./resolvers/FoodVariantsResolver"
import { login, signup } from "./custom_middleware/groups/auth"
import { staticRouting } from "./custom_middleware/staticRouting"
import { routingConfig } from "./custom_middleware/groups/routingConfig"

dotenv.config({ path: __dirname + "/.env" })

const appVanilla = express()
const expressWs = expressWS(appVanilla)
const app = expressWs.app

app.use(express.static("static"))
app.use(express.json())
app.use(cors())
app.use(parseAuth)

await new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [User, Food, FoodVariants],
    subscribers: []
}).initialize()

const schema = await buildSchema({
    resolvers: [FoodResolver, UserResolver, FoodVariantsResolver]
})

app.post('/signup', signup)
app.post('/login', login)

app.post('/create-item', async (req, res) => {
    try {
        const food = new Food()
        food.name = req.body["name"]
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
    ...routingConfig,
    ...ifNameOnly, (req, res) => {
    res.sendFile(path.join(__dirname, "sites", req.url))
})

const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
        req,
        res
    })
})

await server.start()
server.applyMiddleware({ app, path: '/api' })

app.listen({ port: 5500 }, () => {
    console.log("Server is listening of port 5500")
})
