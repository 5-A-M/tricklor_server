import { dbconnection } from "../db/init.js"

const get_service_gmail = (req, res) => {
    dbconnection.collection("type_gmail").find({}).toArray(function(err, result) {
        return res.status(200).json({data: result})
    })
}

export default get_service_gmail