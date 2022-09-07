import md5 from "md5"
import { dbconnection } from "../db/init.js"

const login_admin= (req, res)=> {
    dbconnection.collection("user_admin").find({account: req.body.account, password: md5(req.body.password)}).toArray(function(err, result) {
        if(err) throw err
        if(result.length > 0) {
            return res.status(200).json({message: "Đăng nhập thành công", login: true})
        }
        else {
            return res.status(200).json({message: "Tên tài khoản hoặc mật khẩu không chính xác", login: false})
        }
    })
}

export default login_admin