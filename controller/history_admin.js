import { dbconnection } from "../db/init.js"

const history_admin= (req, res)=> {
    dbconnection.collection("stats").find({type: "history"}).sort({time_created: -1}).toArray(function(err, result) {
        if(err) return err
        else {
            return res.status(200).json({data: result})
        }
    })
}

export default history_admin