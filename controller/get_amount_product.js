import { dbconnection } from "../db/init.js"

const get_amount_product= (req, res)=> {
    dbconnection.collection("product").find({name: req.query.title}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({amount: result.length})
        }
    })
}

export default get_amount_product