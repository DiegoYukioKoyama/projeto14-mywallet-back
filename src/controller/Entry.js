import db from "../config/database.js";
import { Entry } from "../models/Entries.js";

export async function listEntries(req, res) {
    const authUser = res.locals.authUser
    try {
        const entries = await db.collection("entries").find({ email: authUser }).toArray()
        return res.send(entries)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function newEntry(req, res) {
    const { description, value } = req.body
    const { type } = req.params
    const authUser = res.locals.authUser

    if (!type || (type !== 'entry' && type !== 'output')) return res.sendStatus(401);

    try {

        const entry = new Entry(
            authUser,
            description,
            value,
            type
        )
        
        await db.collection("entries").insertOne(entry)

        return res.status(201).send("Nova entrada criada com ")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function logout(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')
  
    try {
  
      await db.collection("sessions").deleteOne({ token })
  
      return res.sendStatus(200)
  
    } catch (error) {
      return res.status(500).send(error.message)
    }
  
  }