import express from "express"
import dotenv from 'dotenv';

import mongoose from "mongoose"
import routes from "./routes/userroute.js"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors());
dotenv.config();
mongoose.connect("mongodb://localhost:27017")
const db = mongoose.connection
db.on("open" , ()=>{console.log("db is scefuly")})

app.listen(5100 , ()=>{
    console.log("port listen on 5100")
})
routes(app)