import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js";
import homeRouter from "./routes/HomeRouter.js";
import db from "./config/database.js";
const server = express();

server.use(express.json());

server.use(cors());

server.use([authRouter, homeRouter])


const PORT = 5000;
server.listen(PORT)