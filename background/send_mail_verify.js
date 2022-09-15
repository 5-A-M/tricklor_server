import md5 from "md5"
import { v4 } from "uuid"
import { dbconnection } from "../db/init.js"

const send_mail_verify= async (req, res)=> {
    dbconnection.collection("user").find({id_user: req.body.id_user, password: md5(req.body.password)}).toArray(function(err, result) {
        if(err ) throw err
        else if(result.length <=0 ) return res.status(200).json({message: "Mật khẩu không chính xác", verify: false})
        else {
            const token_login= v4()
            dbconnection.collection("user").updateOne({password: md5(req.body.password)}, {$set: {twoFa: token_login, oauth2: true}}, function(err, result ) {
                if(err) throw err
                else return res.status(200).json({message: "Hoàn thành xác thực oauth 2", token_login: token_login, verify: true })
            })
        }
    })
}

export default send_mail_verify     