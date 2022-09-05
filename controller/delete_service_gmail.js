import { dbconnection } from "../db/init.js"

const delete_service_gmail= (req, res)=> {
    dbconnection.collection("type_gmail").deleteOne({ id: req.body.id}, function(err, result) {
        if(err) throw err
        if(result.deletedCount > 0) {
            return res.status(200).json({message: "delete successfully", delete: true})
        }   
    })
}

export default delete_service_gmail