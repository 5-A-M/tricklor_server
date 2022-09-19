import { dbconnection } from "../../db/init.js"

const check_balance= (req, res)=> {
    dbconnection.collection("user").find({api_key: req.query.apiKey}).toArray(function(err, result) {
        if(err) return res.status(200).json({error_code: 400, status: false, message: "Error"})
        if(result.length >= 1) {
            return res.status(200).json({error_code: 200, status: true, message: "Success", balance: result[0].balance})
        }
        else {
            return res.status(200).json({error_code: 200, status: false, message: "Unknown"})
        }
    })
}

export default check_balance
