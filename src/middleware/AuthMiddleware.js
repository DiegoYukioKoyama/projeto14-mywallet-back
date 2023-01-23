import db from '../config/database.js'
import dayjs from 'dayjs'

export async function authValidation(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!token) return res.status(401).send("Informe o token!")

  try {
    const checkSession = await db.collection("sessions").findOne({ token })

    if (!checkSession || dayjs().isAfter(checkSession.expires_at)) return res.status(401).send("Você não tem autorização para acessar essa página")

    res.locals.authUser = checkSession.email
    next()

  } catch (error) {
    res.status(500).send(error)
  }
}