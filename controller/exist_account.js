import { dbconnection } from "../db/init.js"

const exist_account= (req, res)=> {
    dbconnection.collection("user").find({account: req.body.account}).toArray(function(err, result) {
        if(err) throw err
        if(result.length > 0 ) {
            return res.status(200).json({exist: true, data: result[0]?.balance})
        }
        else {
            return res.status(200).json({exist: false})
        }
    })
}

export default exist_account