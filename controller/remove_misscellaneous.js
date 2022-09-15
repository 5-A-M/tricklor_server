import { dbconnection } from "../db/init.js"

const remove_misscellaneous= (req, res)=> {
    dbconnection.collection("admin_option").deleteMany({letsChat: "https://stin.to/pbf69"}, function(err, result) {
        if(err) {
            throw err
        }
        else return res.json({delete: result.deletedCount})
    })
}

export default remove_misscellaneous