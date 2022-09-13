import { dbconnection } from "../db/init.js"

const exist_account= (req, res)=> {
    dbconnection.collection("user").find({account: req.body.account}).toArray(function(err, result) {
        if(err) throw err
        if(result.length > 0 ) {
            return res.status(200).json({exist: true, data: {balance: result[0]?.balance, id_user: result[0]?.id_user}})
        }
        else {
            return res.status(200).json({exist: false})
        }
    })
}

export default exist_account