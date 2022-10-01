import { ObjectId } from "mongodb"
import { v4 } from "uuid"
import { dbconnection } from "../db/init.js"
import moment from "moment"

const buy_account= (req, res)=> {
    // Buy failed
    if((parseInt(req.body.balance) + parseInt(req.body.promotion)) < parseInt(req.body.price)) {
        dbconnection.collection("receipt").insertOne({code_receipt: v4(), amount: 0, state: false, note: "Mua tài khoản thất bại", time: new Date(), id_user: req.body.id_user})
        return res.status(200).json({message: "Tài khoản không đủ tiền, vui lòng nạp thêm tiền vào tài khoản", purchase: false})
    }

    // don't enough amount
    if(parseInt(req.body.amount) > parseInt(req.body.amountX)) {
    dbconnection.collection("receipt").insertOne({code_receipt: v4(), amount: 0, state: false, note: "Mua tài khoản thất bại", time: new Date(), id_user: req.body.id_user})
    return res.status(200).json({message: "Số lượng hàng không đủ, Vui lòng thử lại số lượng nhỏ hơn", purchase: false})
    }
    const code_receipt= v4()
    // Buy success
    if(parseInt(req.body.balance) >= parseInt(req.body.price)) {
        dbconnection.collection("user").updateOne({id_user: req.body.id_user}, {$set: {balance: parseInt(req.body.balance) - parseInt(req.body.price)}}, function(err, result) {
            if(err) throw err
            if(result.modifiedCount > 0 || result.matchedCount > 0) {
                // Buy success
                dbconnection.collection("product").find({name: req.body.name}).limit(parseInt(req.body.amount)).toArray(function(err, result1) {
                    if(err) throw err
                    result1.map(item=> {
                        dbconnection.collection("product").deleteOne({"_id": ObjectId(item._id)}, function(err, result2) {
                            if(err) throw err
                        })
                        return 1
                    })
                    dbconnection.collection("detail_order_history").insertOne({code_receipt: code_receipt, data: result1, cost: req.body.price, time_created: new Date()}, function(err, result) {
                        if(err) throw err
                    })
                    dbconnection.collection("receipt").insertOne({code_receipt: code_receipt, amount: -parseInt(req.body.price), state: true, note: `Mua tài khoản ${req.body.name}`, time: new Date(), id_user: req.body.id_user})
                    //
                    dbconnection.collection("stats").insertOne({code_stats: code_receipt, amount: parseInt(req.body.price),name: req.body.name ,id_user: req.body.id_user, date: moment(new Date()).format("DD-MM-YYYY hh:mm:ss A"), type: "history", state: true, info: result1, name: req.body.name, name_account: req.body.name_account, time_created: moment(new Date()).valueOf()}, function(err, result) {
                        if(err) throw err
                    })
                    //
                    return res.status(200).json({message: "Mua tài khoản thành công", data: result1, purchase: true, code_bill: v4()})
                })
            }
        })
    }
    else if(parseInt(req.body.balance) < parseInt(req.body.price) && parseInt(req.body.balance) + parseInt(req.body.promotion) >= parseInt(req.body.price)) {
        dbconnection.collection("user").updateOne({id_user: req.body.id_user}, {$set: {balance: 0, promotion: req.body.promotion - parseInt(req.body.price) + parseInt(req.body.balance)}}, function(err, result) {
            if(err) throw err
            if(result.modifiedCount > 0 || result.matchedCount > 0) {
                // Buy success
                dbconnection.collection("product").findOne({}, function(err, result1) {
                    if(err) throw err
                    dbconnection.collection("product").deleteOne({"_id": ObjectId(result1._id)}, function(err, result2) {
                        if(err) throw err
                    })
                    dbconnection.collection("detail_order_history").insertOne({code_receipt: code_receipt, data: result1, cost: req.body.price, time_created: new Date()}, function(err, result) {
                        if(err) throw err
                    })
                    dbconnection.collection("receipt").insertOne({code_receipt: code_receipt, amount: -parseInt(req.body.price), state: true, note: `Mua tài khoản ${req.body.name}`, time: new Date(), id_user: req.body.id_user})
                    return res.status(200).json({message: "Mua tài khoản thành công", data: {...result1}})
                })
            }
        })
    }
}

export default buy_account