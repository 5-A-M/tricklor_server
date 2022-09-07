import { dbconnection } from "../db/init.js"

const get_user= (req, res)=> {
    dbconnection.collection("user").find({}).toArray(function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({data: result})
        }
    })
}

export default get_user
