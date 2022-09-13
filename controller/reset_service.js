import { dbconnection } from "../db/init.js"

const reset_service_hotmail= (req, res)=> {
    dbconnection.collection("type_pusrchase").deleteMany({}, function(err, result) {
        if(err) throw err
        return res.status(200).json({records: result.deletedCount})
    })
}

const reset_service_gmail= (req, res)=> {
    dbconnection.collection("type_gmail").deleteMany({}, function(err, result) {
        if(err) throw err
        return res.status(200).json({records: result.deletedCount})
    })
}

export const reset_service= {
    reset_service_gmail,
    reset_service_hotmail
}