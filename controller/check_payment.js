import fetch from "node-fetch"
import { v4 } from "uuid"
import { dbconnection } from "../db/init.js"

const check_payment= async (req, res)=> {
    const response= await fetch("https://oauth.casso.vn/v2/transactions?fromDate=2022-04-01&page=1&pageSize=20&sort=DESC", {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Apikey ${req.body.api_payment}`
    }})
    const body= await response.json()
    if(parseInt(req.body.recharge) === parseInt(body.data.records?.[0]?.amount) && req.body.content === body.data.records?.[0]?.description ) {
        dbconnection.collection("user").updateOne({id_user: req.body.id_user}, {$set: {balance:parseInt(req.body.recharge) + parseInt(req.body.balance)}},function(err, result) {
            if(err) throw err
            else {
            }
        })
        const code_receipt= v4()
        dbconnection.collection("stats").insertOne({code_stats: v4(), balance: parseInt(req.body.recharge), id_user: req.body.id_user, date: moment(new Date()).format("DD-MM-YYYY"), type: "recharge"}, function(err, result) {
            if(err) throw err
        })
        //
        dbconnection.collection("receipt").insertOne({code_receipt: code_receipt, amount: req.body.recharge, state: true, note: "Nạp tiền từ hệ thống", time: new Date(), id_user: req.body.id_user}, function(err, result) {
            if(err) throw err
            else {
            }
        })
        return res.status(200).json({status: true, message: "success"})
    }

    return res.status(200).json({status: false, message: "pending"})
    
}

export default check_payment