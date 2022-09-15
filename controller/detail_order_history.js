import { dbconnection } from "../db/init.js"

const detail_order_history= (req, res)=> {
    dbconnection.collection("detail_order_history").find({code_receipt: req.query.code_receipt}).toArray(function(err, result) {
        if(err) throw err
        else return res.status(200).json({...result[0]})
    })
}

export default detail_order_history