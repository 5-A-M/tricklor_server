import { ObjectId } from "mongodb"
import { v4 } from "uuid"
import { dbconnection } from "../db/init.js"

const buy_account= (req, res)=> {
    if((parseInt(req.body.balance) + parseInt(req.body.promotion)) < parseInt(req.body.price)) {
        dbconnection.collection("receipt").insertOne({code_receipt: v4(), amount: 0, state: false, note: "Mua tài khoản thất bại", time: new Date(), id_user: req.body.id_user})
        return res.status(200).json({message: "Tài khoản không đủ tiền, vui lòng nạp thêm tiền vào tài khoản", purchase: false})
    }
    if(parseInt(req.body.balance) >= parseInt(req.body.price)) {
        dbconnection.collection("user").updateOne({id_user: req.body.id_user}, {$set: {balance: parseInt(req.body.balance) - parseInt(req.body.price)}}, function(err, result) {
            if(err) throw err
            if(result.modifiedCount > 0 || result.matchedCount > 0) {
                dbconnection.collection("product").findOne({}, function(err, result1) {
                    if(err) throw err
                    dbconnection.collection("product").deleteOne({"_id": ObjectId(result1._id)}, function(err, result2) {
                        if(err) throw err
                        else console.log(result2.deletedCount)
                    })
                    dbconnection.collection("receipt").insertOne({code_receipt: v4(), amount: -parseInt(req.body.price), state: true, note: "Mua tài khoản hotmail", time: new Date(), id_user: req.body.id_user})
                    return res.status(200).json({message: "Mua tài khoản thành công", data: {...result1}, purchase: true, code_bill: v4()})
                })
            }
        })
    }
    else if(parseInt(req.body.balance) < parseInt(req.body.price) && parseInt(req.body.balance) + parseInt(req.body.promotion) >= parseInt(req.body.price)) {
        dbconnection.collection("user").updateOne({id_user: req.body.id_user}, {$set: {balance: 0, promotion: req.body.promotion - parseInt(req.body.price) + parseInt(req.body.balance)}}, function(err, result) {
            if(err) throw err
            if(result.modifiedCount > 0 || result.matchedCount > 0) {
                dbconnection.collection("product").findOne({}, function(err, result1) {
                    if(err) throw err
                    dbconnection.collection("product").deleteOne({"_id": ObjectId(result1._id)}, function(err, result2) {
                        if(err) throw err
                        else console.log(result2.deletedCount)
                    })
                    dbconnection.collection("receipt").insertOne({code_receipt: v4(), amount: -parseInt(req.body.price), state: true, note: "Mua tài khoản hotmail", time: new Date(), id_user: req.body.id_user})
                    return res.status(200).json({message: "Mua tài khoản thành công", data: {...result1}})
                })
            }
        })
    }
}

export default buy_account