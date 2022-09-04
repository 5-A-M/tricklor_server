import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectMongo from "./db/init.js"
import signup from "./controller/signup.js"
import login from "./controller/login.js"
import index from "./controller/index.js"
import change_password from "./controller/change_password.js"
import get_option from "./controller/get_option.js"
import update_admin_option from "./controller/update_admin_option.js"
import recharge_manual from "./controller/recharge_manual.js"

dotenv.config()

const app= express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.post("/signup", signup)
app.post("/login", login)
app.post("/change_password", change_password)
app.post("/get_option/main", get_option)
app.post("/update/admin_option", update_admin_option)
app.post("/recharge/manual", recharge_manual)
app.post("/", index)

connectMongo()

app.listen(process.env.PORT || 4000, ()=> console.log("Server run port 4000"))