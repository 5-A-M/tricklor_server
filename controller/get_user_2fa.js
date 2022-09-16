import { dbconnection } from "../db/init.js"

const get_user_2fa= (req, res)=> {
    dbconnection.collection("user").find({id_user: req.body.id_user}).toArray(function(err, result) {
        if(err) throw err
        if(result.length > 0) {
            return res.status(200).json({uid: result[0].id_user, sid: result[0].id_key})
        }
    })
}

export default get_user_2fa