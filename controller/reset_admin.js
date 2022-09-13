import md5 from "md5"
import { dbconnection } from "../db/init.js"

const reset_admin= (req, res)=> {

    dbconnection.collection("user_admin").updateOne({}, {$set: {account: req.body.account, password: md5(req.body.password)}}, function(err, result) {
        if(err) throw err
        if(result.modifiedCount > 0 ) {
            return res.status(200).json({reset: true})
        }
    })
}

export default reset_admin