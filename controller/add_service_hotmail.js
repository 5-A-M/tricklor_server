import { dbconnection } from "../db/init.js"
import { v4 } from "uuid"

const add_service_hotmail= (req, res)=> {
    dbconnection.collection("type_pusrchase").insertOne({title: req.body.a1, pop3: req.body.a2, live: req.body.a3, nation: req.body.a4, price: req.body.a5, amount: req.body.a6, id: v4()}, function(err, result) {
        if(err) throw err
        else {
            res.status(200).json({message: "Thêm thành công", insert: true})
        }
    })
}

export default add_service_hotmail
