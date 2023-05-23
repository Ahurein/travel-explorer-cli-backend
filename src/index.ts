import express, {Application, Request, Response} from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import { attractionRoutes } from "./routes/attractions.route";
import rateLimit from 'express-rate-limit'

const app: Application = express()

//configuration
const limiter = rateLimit({
    windowMs: 7200000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: "You have exceeded your request limit, Please wait for a while"
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.text())

app.use(limiter)

const router  = express.Router()
// register routes
app.use("/api/v1", router)
attractionRoutes(router)

app.use("*", (req: Request, res: Response)=> {
    res.send("didnt' match")
})


app.listen(5000, ()=>{
    mongoose.connect(process.env.DBURI!)
    mongoose.connection.on('connected', ()=> console.log("DB connected"))
    console.log('Application running on port 5000')
})