import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db

try {
    await mongoClient.connect()
    db = mongoClient.db()
} catch {
    res.status(500).send(err.message)
}

export default db