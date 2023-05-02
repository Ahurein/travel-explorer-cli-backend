import express, { Express, Application} from "express";

const app: Application = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.text())

const router  = express.Router()
// register routes
app.use("/api/v1/0", router)


app.listen(5000, ()=>{
    console.log('Application running on port 5000')
})