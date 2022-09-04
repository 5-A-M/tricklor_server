import { dbconnection } from "../db/init.js"

const recharge_manual= (req, res)=> {
    dbconnection.collection("user").updateOne({account: req.body.account}, {$set: {balance: Math.ceil(req.body.recharge)}}, function(err, result) {
        if(err) throw err
        console.log(result)
        if(result.modifiedCount > 0 ) {
            return res.status(200).json({message: "Nạp tiền thành công", recharge: true})
        }
        else {
            return res.status(200).json({message: "Nạp tiền thất bại", recharge: false})
        }
    })

}

export default recharge_manual