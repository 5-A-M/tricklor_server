import { dbconnection } from "../db/init.js"

const get_token_qr_code= (req, res)=> {
    dbconnection.collection("user").find({id_user: req.body.uid}).toArray(function(err, result) {
        if(err) throw err
        return res.status(200).json({token_qr_code: result[0].token_qr_code})
    })
}

export default get_token_qr_code