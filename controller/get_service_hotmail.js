import { dbconnection } from "../db/init.js"

const get_service_hotmail = (req, res) => {
    dbconnection.collection("type_pusrchase").find({}).toArray(function(err, result) {
        return res.status(200).json({data: result})
    })
}

export default get_service_hotmail