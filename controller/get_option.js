import { dbconnection } from "../db/init.js"

const get_option= (req, res)=> {
    dbconnection.collection("admin_option").find({}).toArray(function(err, result) {
        if(err) throw err
        if(result.length > 0) {
            return res.status(200).json({data: {...result[0]}})
        }
        else {  
            return res.status(200).json({message: "Không có file yêu cầu"})
        }
    })
}

export default get_option