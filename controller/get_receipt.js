import { dbconnection } from "../db/init.js"

const get_receipt= (req, res)=> {
    dbconnection.collection("receipt").find({id_user: req.query.id_user}).sort({time: -1}).toArray(function(err, result) {
        if(err ) throw err
        else {
            return res.status(200).json({data: result})
        }
    })
}

export default get_receipt