import { dbconnection } from "../db/init.js"

const recharge_manual= (req, res)=> {
    dbconnection.collection("user").find({account: req.body.account}).toArray(function(err, result1) {
        if(err) throw err
        else {
            if(result1.length > 0) {
                dbconnection.collection("user").updateOne({account: req.body.account}, {$set: {balance: Math.ceil(result1[0].balance) + Math.ceil(req.body.recharge)}}, function(err, result) {
                    if(err) throw err
                    if(result.modifiedCount > 0 ) {
                        return res.status(200).json({message: "Nạp tiền thành công", recharge: true})
                    }
                    else {
                        return res.status(200).json({message: "Nạp tiền thất bại", recharge: false})
                    }
                })
            }
        }
    })

}

export default recharge_manual