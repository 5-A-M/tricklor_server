import { dbconnection } from "../db/init.js"
import { v4 } from "uuid"
import moment from "moment"

const recharge_manual= (req, res)=> {
    dbconnection.collection("user").find({account: req.body.account}).toArray(function(err, result1) {
        if(err) throw err
        else {
            if(result1.length > 0) {
                dbconnection.collection("user").updateOne({account: req.body.account}, {$set: {balance: Math.ceil(result1[0].balance) + Math.ceil(req.body.recharge)}}, function(err, result) {
                    if(err) throw err
                    if(result.modifiedCount > 0 ) {
                        dbconnection.collection("stats").insertOne({code_stats: v4(), balance: parseInt(req.body.recharge), id_user: req.body.id_user, date: moment(new Date()).format("DD-MM-YYYY"), type: "recharge"}, function(err, result) {
                            if(err) throw err
                        })
                        dbconnection.collection("receipt").insertOne({code_receipt: v4(), amount: +parseInt(req.body.recharge), state: true, note: "Nạp tiền từ hệ thống", time: new Date(), id_user: req.body.id_user})
                        return res.status(200).json({message: "Nạp tiền thành công", recharge: true})
                    }
                    else {
                        dbconnection.collection("receipt").insertOne({code_receipt: v4(), amount: +0, state: false, note: "Nạp tiền từ hệ thống", time: new Date(), id_user: req.body.id_user})
                        return res.status(200).json({message: "Nạp tiền thất bại", recharge: false})
                    }
                })
            }
        }
    })

}

export default recharge_manual