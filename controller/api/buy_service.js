import moment from "moment/moment.js"
import { v4 } from "uuid"
import { dbconnection } from "../../db/init.js"

const buy_service= (req, res)=> {
    dbconnection.collection("user").find({api_key: req.query.apiKey}).toArray(function(err, result) {
        if(err) return res.status(200).json({error_code: 400, status: false, message: "Error"})
        if(result.length < 1) return res.status(200).json({error_code: 401, status: false, message: "Unknown"})
        else {  
            const balanceUser= result[0].balance
            dbconnection.collection("type_pusrchase").find({title: req.query.account_type}).toArray(function(err, result) {
                if(err) return res.status(200).json({error_code: 400, status: false, message: "Error"})
                if(result.length > 0) {
                    const price= result[0].price.replace("d", "")
                    const code_receipt= v4()
                    const id_user= result[0].id_user
                    // buy success
                    if(parseInt(balanceUser) >= parseInt(price)) {
                        dbconnection.collection("product").findOne({}, function(err, result) {
                            if(err ) return res.status(200).json({error_code: 400, status: false, message: "Error"})
                            if(result?.account?.length > 0 ) {
                                dbconnection.collection("user").updateOne({api_key: req.query.apiKey}, {$set: {balance: parseInt(balanceUser) - parseInt(price)}}, function(err) {if(err) throw err})
                                dbconnection.collection("receipt").insertOne({code_receipt: code_receipt, amount: price, state: true, note: "Mua tài khoản "+req.query.account_type, time: new Date(), id_user: id_user}, function(err) {if(err) throw err})
                                dbconnection.collection("detail_order_history").insertOne({code_receipt: code_receipt, account: result.account, password: result.password, cost: price, time_created: new Date()}, function(err) {if(err) throw err})
                                dbconnection.collection("stats").insertOne({code_stats: code_receipt, id_user: id_user, amount: price, date: moment(new Date()).format("YYYY-MM-DD hh:mm:ss A"), type: "history", state: true, info: {account: result.account, password: result.password}}, function(err) {if(err) throw err})
                                
                                return res.status(200).json({error_code: 200, status: true, message: "Buy success", code_receipt: code_receipt, price: price, balanceUser: parseInt(balanceUser) - parseInt(price)})
                            }
                        })
                    }
                    // don't enough balance
                    if(parseInt(balanceUser) < parseInt(price)) {
                        return res.status(200).json({error_code: 200, status: false, message: "Buy failed", code_receipt: code_receipt, price: price, balanceUser: parseInt(balanceUser)})
                    }
                }
                else return res.status(200).json({error_code: 401, status: false, message: "Unknown"})
            })
        }
    })
}

export default buy_service