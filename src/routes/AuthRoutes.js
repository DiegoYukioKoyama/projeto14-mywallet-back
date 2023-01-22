import { Router } from "express";
import { signIn, signUp } from "../controller/Auth.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { loginSchema, signInSchema } from "../schema/AuthSchema.js";


const authRouter = Router()
authRouter.post("/",validateSchema(loginSchema), signIn)
authRouter.post("/cadastro",validateSchema(signInSchema), signUp)

export default authRouter