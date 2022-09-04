import md5 from "md5"
import { dbconnection } from "../db/init.js"

const change_password= (req, res)=> {
    if(req.body.confirmNewPassword.trim() !==req.body.new_password.trim()) return res.status(200).json({message: "Vui lòng xác thực lại mật khẩu mới", change_password: false})
    dbconnection.collection("user").find({account: req.body.account, password: md5(req.body.old_password)}).toArray(function(err, result) {
        if(err) throw err
        if(result.length < 1) return res.status(200).json({message: "Mật khẩu không chính xác", change_password: false})
        if(result.length > 0) {
            dbconnection.collection("user").updateOne({account: req.body.account}, {$set: {password: md5(req.body.new_password)}}, function(err, result2) {
                if(err) throw err
                return res.status(200).json({message: "Cập nhật mật khẩu thành công", change_password: true})
            })
        }
    })
}

export default change_password