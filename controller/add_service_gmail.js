import { v4 } from "uuid"
import { dbconnection } from "../db/init.js"

const add_service_gmail= (req, res)=> {
    dbconnection.collection("type_gmail").insertOne({title: req.body.b1, pop3: req.body.b2, live: req.body.b3, nation: req.body.b4, price: req.body.b5, amount: req.body.b6, id: v4()}, function(err, result) {
        if(err) throw err
        else {
            res.status(200).json({message: "Thêm thành công", insert: true})
        }
    })
}

export default add_service_gmail
