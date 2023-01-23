import { Router } from "express";
import { listEntries, logout, newEntry } from "../controller/Entry.js";
import { authValidation } from "../middleware/AuthMiddleware.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { entry } from "../schema/EntrySchema.js";


const homeRouter = Router()
homeRouter.use(authValidation)
homeRouter.get("/home", listEntries)
homeRouter.post("/home/:type", validateSchema(entry), newEntry)

export default homeRouter