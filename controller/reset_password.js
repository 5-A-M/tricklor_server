import md5 from "md5"
import { dbconnection } from "../db/init.js"

const reset_password= (req, res)=> {
    dbconnection.collection("user").updateOne({id_user: req.body.id_user}, {$set: {password: md5(req.body.new_password)}}, function(err, result) {
        if(err) throw err
        else {
            return res.status(200).json({message: "Đặt lại mật khẩu thành công", reset: true})
        }
    })
}

export default reset_password