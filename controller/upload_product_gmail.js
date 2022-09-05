import { v4 } from "uuid"
import { dbconnection } from "../db/init.js"

const upload_product_gmail= (req, res)=> {
    dbconnection.collection("product_gmail").insertOne({mail: req.body.mail, password: req.body.password, id: v4()})
}

export default upload_product_gmail