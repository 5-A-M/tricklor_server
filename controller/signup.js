import md5 from "md5"
import moment from "moment"
import { v4 } from "uuid"
import { dbconnection } from "../db/init.js"

const signup= (req, res)=> {
    dbconnection.collection("user").find({ account: req.body.account }).toArray(function(err, result) {
        if(err) throw err
        if(result.length > 0) {
            return res.status(200).json({message: "Tài khoản đã tồn tại", signup :false})
        }
        else {
            const id_key= v4()
            dbconnection.collection("user").insertOne({account: req.body.account, password: md5(req.body.password), email: req.body.email, id_user: v4(), id_key: id_key, id_secret: md5(id_key), balance: 0, promotion: 0, api_key: v4(), token_qr_code: v4()}, function(err, result) {
                if(err) throw err
                dbconnection.collection("stats").insertOne({code_stats: v4(), subscribe: 1, id_user_f: v4(), date: moment(new Date()).format("DD-MM-YYYY"), type: "subscribe"}, function(err, result) {
                    if(err) throw err
                })
                return res.status(200).json({message: "Tạo tài khoản thành công", signup: true})
            })
        }
    })
}   

export default signup