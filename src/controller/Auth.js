import bcrypt from "bcrypt";
import db from "../config/database.js";
import { User } from "../models/User.js";
import { v4 as uuidV4} from "uuid"
import { AuthToken } from "../models/AuthToken.js";

export async function signIn(req, res) {
  const { email, password } = req.body
  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.status(400).send('E-mail ou senha inválidos');

    const matchPasswords = await bcrypt.compare(password, user.password);

    if (!matchPasswords) return res.status(400).send('E-mail ou senha inválidos');

    const token = new AuthToken()

    await db.collection("sessions").updateOne({
      email: user.email
    }, {
      $set: {
        email: user.email,
        token: token.uuid,
        expire_at: token.expire_at
      }
    }, { upsert: true });

    return res.send({
      token: token.uuid,
      name: user.name
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function signUp(req, res) {
  const { name, email, password } = req.body

  try {
    const CheckEmail = await db.collection("users").findOne({ email })
    if (CheckEmail) return res.sendStatus(409)

    const user = new User(name, email, bcrypt.hashSync(password, 10))

    await db.collection("users").insertOne(user)

    res.status(201).send("Usuário cadastrado com sucesso!")

  } catch (error) {

    res.status(500).send(error.message)

  }
}

export async function deleteToken(req, res) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", '')

  try {

    await db.collection("sessions").deleteOne({ token })

    return res.sendStatus(200)

  } catch (error) {
    return res.status(500).send(error.message)
  }

}